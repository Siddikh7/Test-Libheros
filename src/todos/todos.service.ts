import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ListTodosQueryDto } from './dto/list-todos.query.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}

  create(userId: string, createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todosRepository.create({
      title: createTodoDto.title,
      isCompleted: false,
      user: { id: userId } as User,
    });

    return this.todosRepository.save(todo);
  }

  async findAll(userId: string, query: ListTodosQueryDto): Promise<Todo[]> {
    const queryBuilder = this.todosRepository
      .createQueryBuilder('todo')
      .leftJoin('todo.user', 'user')
      .where('user.id = :userId', { userId });

    if (query.status === 'todo') {
      queryBuilder.andWhere('todo.isCompleted = false');
    }

    if (query.status === 'completed') {
      queryBuilder.andWhere('todo.isCompleted = true');
    }

    if (query.search) {
      queryBuilder.andWhere('todo.title ILIKE :search', {
        search: `%${query.search}%`,
      });
    }

    queryBuilder.orderBy('todo.createdAt', query.sortCreatedAt === 'asc' ? 'ASC' : 'DESC');

    return queryBuilder.getMany();
  }

  async findOne(userId: string, id: string): Promise<Todo> {
    const todo = await this.todosRepository
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.user', 'user')
      .where('todo.id = :id', { id })
      .andWhere('user.id = :userId', { userId })
      .getOne();

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  async update(userId: string, id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(userId, id);

    if (updateTodoDto.title !== undefined) {
      todo.title = updateTodoDto.title;
    }

    if (updateTodoDto.isCompleted !== undefined) {
      todo.isCompleted = updateTodoDto.isCompleted;
    }

    return this.todosRepository.save(todo);
  }

  async remove(userId: string, id: string): Promise<void> {
    const todo = await this.findOne(userId, id);
    await this.todosRepository.remove(todo);
  }
}
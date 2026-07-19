import { Transform, Type } from 'class-transformer';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class ListTodosQueryDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Type(() => String)
  @IsOptional()
  @IsString()
  search?: string;

  @Type(() => String)
  @IsOptional()
  @IsIn(['all', 'todo', 'completed'])
  status?: 'all' | 'todo' | 'completed';

  @Type(() => String)
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortCreatedAt?: 'asc' | 'desc';
}
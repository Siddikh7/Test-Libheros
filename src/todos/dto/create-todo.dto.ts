import { Transform, Type } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Type(() => String)
  @IsString()
  @MinLength(1)
  title: string;
}
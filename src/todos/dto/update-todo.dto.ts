import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTodoDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Type(() => String)
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  isCompleted?: boolean;
}
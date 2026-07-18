import { Type, Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @Type(() => String)
  @IsEmail()
  email: string;

  @Type(() => String)
  @IsString()
  @MinLength(8)
  password: string;
}
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @Type(() => String)
  @IsEmail()
  email: string;

  @Type(() => String)
  @IsString()
  @MinLength(8)
  password: string;

  @Type(() => String)
  @IsString()
  @MinLength(8)
  passwordConfirmation: string;
}
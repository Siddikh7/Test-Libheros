import { Transform, Type } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Type(() => String)
  @IsString()
  @MinLength(1)
  firstName: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Type(() => String)
  @IsString()
  @MinLength(1)
  lastName: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @Type(() => String)
  @IsEmail()
  email: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @Type(() => String)
  @IsEmail()
  confirmEmail: string;

  @Type(() => String)
  @IsString()
  @MinLength(8)
  password: string;

  @Type(() => String)
  @IsString()
  @MinLength(8)
  passwordConfirmation: string;
}
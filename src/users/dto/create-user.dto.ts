import { IsEmail, IsString, MinLength, IsIn } from 'class-validator';
import { Role } from '../role.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsIn(Object.values(Role))
  role: Role;
}

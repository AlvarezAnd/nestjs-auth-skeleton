import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

export class UpdateUserDto extends CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

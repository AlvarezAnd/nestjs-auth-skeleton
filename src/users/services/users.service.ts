import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from 'src/users/repositories/users.repository';
import { UsersModuleInjection } from 'src/common/enums/users-injection.enum';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dtos/users.dto';

export interface IUsersService {
  findAll(): Promise<User[]>;
  create(createUserDto: CreateUserDto): Promise<User>;
}

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(UsersModuleInjection.USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(createUserDto);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from 'src/users/repositories/users.repository';
import { UsersModuleInjection } from 'src/common/enums/users-injection.enum';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { DeleteResult } from 'typeorm';
import { UserAlreadyExistsException, UserNotFoundException } from '../exceptions/users.exception';

export interface IUsersService {
  getAll(): Promise<User[]>;
  getOneById(id: number): Promise<User>;
  create(createUserDto: CreateUserDto): Promise<User>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
  deleteById(id: number): Promise<DeleteResult>;
}

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(UsersModuleInjection.USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async getAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async getOneById(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneById(id);
      if (!user) {
        throw new UserNotFoundException(id);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneByEmail(createUserDto.email);
    if (user) {
      throw new UserAlreadyExistsException(createUserDto.email);
    }
    return await this.usersRepository.create(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneById(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return await this.usersRepository.update(updateUserDto);
  }

  async deleteById(id: number): Promise<DeleteResult> {
    const user = await this.usersRepository.findOneById(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return await this.usersRepository.deleteById(id);
  }
}

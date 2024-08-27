import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const usersData: User[] = [];

export interface IUsersRepository {
  findAll(): Promise<User[]>;
  findOneById(id: number): Promise<User>;
  create(createUserDto: CreateUserDto): Promise<User>;
  update(updateUserDto: UpdateUserDto): Promise<User>;
  deleteById(id: number): Promise<User>;
}

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  update(updateUserDto: UpdateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<User[]> {
    return Promise.resolve(usersData);
  }

  findOneById(id: number): Promise<User> {
    return Promise.resolve(usersData.find((user) => user.id === id));
  }
}

import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

export interface IUsersRepository {
  findAll(): Promise<User[]>;
  findOneById(id: number): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  create(createUserDto: CreateUserDto): Promise<User>;
  update(updateUserDto: UpdateUserDto): Promise<User>;
  deleteById(id: number): Promise<DeleteResult>;
}

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findOneById(id: number): Promise<User> {
    return await this.repository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.repository.findOneBy({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.repository.create(createUserDto);
    return await this.repository.save(newUser);
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    await this.repository.update(updateUserDto.id, updateUserDto);
    return await this.repository.save(updateUserDto);
  }
  async deleteById(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}

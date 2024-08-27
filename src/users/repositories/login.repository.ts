import { Injectable } from '@nestjs/common';
import { Login } from '../entities/login.entity';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface ILoginRepository {
  findOneByUser(user: User): Promise<Login>;
}

@Injectable()
export class LoginRepository implements ILoginRepository {
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
  ) {}

  findOneByUser(user: User): Promise<Login> {
    return this.loginRepository.findOneBy({ user });
  }
}

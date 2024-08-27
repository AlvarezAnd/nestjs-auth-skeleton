import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { IUsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/users.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USERS_SERVICE')
    private readonly usersService: IUsersService,
  ) {}

  @Get('')
  async getAll() {
    return this.usersService.findAll();
  }

  @Post('')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}

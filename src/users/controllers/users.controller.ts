import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { IUsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USERS_SERVICE')
    private readonly usersService: IUsersService,
  ) {}

  @Get('')
  async getAll() {
    const users = await this.usersService.getAll();
    const total = users.length;
    return { users, total };
  }

  @Get(':id')
  async getOneById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getOneById(id);
  }

  @Post('')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteById(id);
  }
}

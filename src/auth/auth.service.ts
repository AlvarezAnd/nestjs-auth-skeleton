import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SignUpDto, SignInDto } from './auth.dto';
import { UsersModuleInjection } from 'src/common/enums/users-injection.enum';
import { IUsersRepository } from 'src/users/repositories/users.repository';
import { CreateUserDto } from 'src/users/dtos/users.dto';

export interface IAuthService {
  signIn(signInDto: SignInDto): Promise<string>;
  signUp(signUpDto: SignUpDto): Promise<any>;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(UsersModuleInjection.USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
    @Inject(UsersModuleInjection.LOGIN_REPOSITORY)
    private readonly loginRepository: IUsersRepository,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    return new Promise(() => signInDto);
  }

  async signUp(signUpDto: SignUpDto): Promise<any> {
    try {
      const createUserDto = new CreateUserDto(signUpDto.username, signUpDto.email);
      return await this.usersRepository.create(createUserDto);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}

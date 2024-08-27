import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersModuleInjection } from 'src/common/enums/users-injection.enum';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { Login } from './entities/login.entity';
import { UsersRepository } from './repositories/users.repository';
import { LoginRepository } from './repositories/login.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Login])],
  controllers: [UsersController],
  providers: [
    {
      provide: UsersModuleInjection.USERS_REPOSITORY,
      useClass: UsersRepository,
    },
    {
      provide: UsersModuleInjection.USERS_SERVICE,
      useClass: UsersService,
    },
    {
      provide: UsersModuleInjection.LOGIN_REPOSITORY,
      useClass: LoginRepository,
    },
  ],
  exports: [
    {
      provide: UsersModuleInjection.USERS_REPOSITORY,
      useClass: UsersRepository,
    },
    {
      provide: UsersModuleInjection.LOGIN_REPOSITORY,
      useClass: LoginRepository,
    },
  ],
})
export class UsersModule {}

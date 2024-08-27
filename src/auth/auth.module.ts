import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthInjectionEnum } from 'src/common/enums/auth-injection.enum';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthInjectionEnum.AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}

import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IAuthService } from './auth.service';
import { AuthInjectionEnum } from 'src/common/enums/auth-injection.enum';
import { SignUpDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthInjectionEnum.AUTH_SERVICE) private readonly authService: IAuthService) {}

  @Post('sign-in')
  signIn() {
    return '';
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }
}

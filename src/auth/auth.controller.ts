import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto, RegisterAuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('login')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginAuthDto) {
    return await this.authService.login(data);
  }

  @Post('register')
  async register(@Body() data: RegisterAuthDto) {
    return await this.authService.register(data);
  }


}

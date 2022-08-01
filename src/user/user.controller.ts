import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Headers,
  Put,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@ApiBearerAuth('Bearer')
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('v1/user')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Put('update')
  @HttpCode(HttpStatus.OK)
  async create(@Headers('Authorization') token: any, @Body() body: UserDto) {
    const data = this.jwtService.decode(token.replace('Bearer ', ''));
    return await this.userService.update(body, data);
  }

  // @Get('users')
  // @HttpCode(HttpStatus.OK)
  // async getAll() {
  //   return await this.userService.getAll();
  // }
}

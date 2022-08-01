import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema, AUTH_MODEL_NAME } from 'src/auth/auth.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AUTH_MODEL_NAME, schema: AuthSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService],
})
export class UserModule {}

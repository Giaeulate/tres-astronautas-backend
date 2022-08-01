import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { LoginAuthDto, RegisterAuthDto } from './auth.dto';
import * as dotenv from 'dotenv';
import { ErrorMessageException } from 'src/shared/exeption/error-message-exception';
import { InjectModel } from '@nestjs/mongoose';
import { AUTH_MODEL_NAME, AuthModel } from './auth.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AUTH_MODEL_NAME) private readonly authModel: Model<AuthModel>,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginAuthDto) {
    const { email, password } = data;
    const findUser = await this.authModel.findOne({ email });
    if (!findUser) throw new HttpException('Email no encontrado', 404);
    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword) throw new HttpException('Contraseña incorrecta', 403);

    const payload = { id: findUser._id, email: findUser.email };
    const token = this.jwtService.sign(payload);
    const resp = {
      // user: payload,
      token,
    };
    return resp;
  }

  async register(data: RegisterAuthDto) {
    // if (data.token != process.env.AUTH_TOKEN) {
    //   return new ErrorMessageException(
    //     'Token inválido',
    //     HttpStatus.NOT_ACCEPTABLE,
    //   );
    // }

    const hasEmail = await this.authModel.findOne({ email: data.email });
    if (hasEmail) {
      throw new HttpException('Error, el correo ya fue registrado', 403);
    }

    const { password } = data;
    const hashPassword = await hash(password, 10);
    data = { ...data, password: hashPassword };
    try {
      const newObj = new this.authModel(data);
      await newObj.save();
      const resp = { ...newObj };
      delete resp['_doc']['password'];
      const payload = { id: newObj._id, email: newObj.email };
      const token = this.jwtService.sign(payload);
      resp['_doc']['token'] = token;
      return resp['_doc'];
    } catch (error) {
      return new ErrorMessageException(
        `${error.message}`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  validateToken(token: string) {
    token = token.replace('Bearer ', '');
    return this.jwtService.decode(token);
  }
}

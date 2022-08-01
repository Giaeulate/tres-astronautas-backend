import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthModel, AUTH_MODEL_NAME } from 'src/auth/auth.model';
import { ErrorMessageException } from 'src/shared/exeption/error-message-exception';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(AUTH_MODEL_NAME)
    private readonly authModel: Model<AuthModel>,
  ) {}

  async update(body: UserDto, data: any) {
    try {
      await this.authModel.updateOne({ _id: data.id }, { ...body });
      return {
        status: true,
        message: 'Datos actualizados correctamente',
      };
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async getAll() {
    try {
      const resp = await this.authModel.find().exec();
      return resp.map((obj) => {
        delete obj._id;
      });
    } catch (error) {
      return new ErrorMessageException(error.message);
    }
  }
}

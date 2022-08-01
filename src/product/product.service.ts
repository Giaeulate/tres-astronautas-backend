import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDto } from './product.dto';
import { ProductModel, PRODUCT_MODEL_NAME } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(PRODUCT_MODEL_NAME)
    private readonly productModel: Model<ProductModel>,
  ) {}

  async getAll(data: any) {
    try {
      const resp = await this.productModel.find({ owner: { _id: data.id } });
      if (resp.length == 0) {
        throw new HttpException('Sin datos', 404);
      }
      return resp;
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }

  async finOneByUser(id: string, data: any) {
    try {
      const resp = await this.productModel.findOne({
        _id: id,
        owner: { _id: data.id },
      });
      if (!resp) {
        throw new HttpException('No encontrado', 404);
      }
      return resp;
    } catch (error) {
      throw new HttpException('No encontrado', 404);
    }
  }

  async create(body: ProductDto, data: any, file: any = null) {
    try {
      if (file) {
        body["image"] = file.filename;
      }
      const newObj = new this.productModel({ ...body, owner: data.id });
      return await newObj.save();
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async update(id: string, body: ProductDto, data: any) {
    await this.finOneByUser(id, data);
    try {
      await this.productModel.updateOne({ _id: id, ...body });
      return {
        status: true,
        message: 'Datos actualizados correctamente',
      };
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async delete(id: string, data: any) {
    await this.finOneByUser(id, data);
    try {
      await this.productModel.deleteOne({ _id: id });
      return {
        status: true,
        message: 'Producto eliminado correctamente',
      };
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
  UseGuards,
  Get,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductDto } from './product.dto';
import { ProductService } from './product.service';
import { diskStorage } from 'multer';
import { renameImage, fileFilterImage } from 'src/shared/image-helper';

@ApiBearerAuth('Bearer')
@UseGuards(JwtAuthGuard)
@ApiTags('Products')
@Controller('v1/product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('')
  @HttpCode(HttpStatus.OK)
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: 'media/products/',
  //       filename: renameImage,
  //     }),
  //     fileFilter: fileFilterImage,
  //   }),
  // )
  async create(
    @Headers('Authorization') token: any,
    @Body() body: ProductDto,
    // @UploadedFile() file: Express.Multer.File,
  ) {
    const data = this.jwtService.decode(token.replace('Bearer ', ''));
    // return await this.productService.create(body, data, file);
    return await this.productService.create(body, data);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getAll(@Headers('Authorization') token: any) {
    const data = this.jwtService.decode(token.replace('Bearer ', ''));
    return await this.productService.getAll(data);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Headers('Authorization') token: any,
    @Param('id') id: string,
    @Body() body: ProductDto,
  ) {
    const data = this.jwtService.decode(token.replace('Bearer ', ''));
    return await this.productService.update(id, body, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Headers('Authorization') token: any, @Param('id') id: string) {
    const data = this.jwtService.decode(token.replace('Bearer ', ''));
    return await this.productService.delete(id, data);
  }
}

import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { MulterModule } from '@nestjs/platform-express';

dotenv.config();

@Module({
  imports: [
    //   ServeStaticModule.forRoot({
    //     rootPath: join(__dirname, '..', 'media'),
    //   }),
    // MulterModule.registerAsync({
    //   useFactory: () => ({
    //     dest: './media',
    //   }),
    // }),
    MongooseModule.forRoot(`${process.env.MONGO_CONFIG}`),
    AuthModule,
    ProductModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

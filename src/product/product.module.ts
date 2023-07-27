import { Module } from '@nestjs/common';
import { ProductService } from './product.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { product, product_category} from 'models';
import { ProductController } from './product.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [SequelizeModule.forFeature([product, product_category]), MulterModule.register({dest: './images'})],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}

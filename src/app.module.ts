import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { LoginModule } from './login/login.module';
import { checkToken } from './login/login.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images'), // Sesuaikan dengan path ke folder gambar
    }),
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: 'localhost',
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        models: [],
        autoLoadModels: true,
      }),
    }),
    UserModule,
    CustomerModule,
    ProductModule,
    OrderModule,
    LoginModule]
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkToken)
      .exclude('login')
      .forRoutes('*');
  }
}

// export class AppModule{}
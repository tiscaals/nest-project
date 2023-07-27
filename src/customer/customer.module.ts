import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import {SequelizeModule} from '@nestjs/sequelize/dist'
import { customer, users } from 'models';

@Module({
    imports: [SequelizeModule.forFeature([customer, users])],
    controllers: [CustomerController],
    providers: [CustomerService],
})

export class CustomerModule {}

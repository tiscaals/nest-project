import { Body, Controller, Get, Param, Patch  } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { updateCustomer } from './dto/customerUpdate.dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService){}

    @Get()
    getUserCustomer(): any{
        return this.customerService.getUserCustomer()
    }

    @Get('order')
    getUserOrder(): any{
        return this.customerService.getUserOrder()
    }

    @Get()
    getUserOrderQuery(): any{
        return this.customerService.getUserOrderQuery()
    }

    @Patch(':id')
    updateUsername(@Body() updateCustomer: updateCustomer, @Param('id') id: number): any{
        return this.customerService.updateUserCustomer(updateCustomer, id)
    }
}
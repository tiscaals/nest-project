import { PartialType } from '@nestjs/mapped-types';
import {IsString, IsNotEmpty} from 'class-validator'
import { createProduct } from './createProduct.dto';

export class updateProduct extends PartialType(createProduct){
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    category_id: string;

    @IsNotEmpty()
    @IsString()
    price: string;    
}

export class file{
    @IsNotEmpty()
    image: any;
}
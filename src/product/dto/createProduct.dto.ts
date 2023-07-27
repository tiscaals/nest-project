import {IsString, IsNotEmpty} from 'class-validator'

export class createProduct{
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
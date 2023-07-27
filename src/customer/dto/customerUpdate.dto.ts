import {IsString, IsNotEmpty} from 'class-validator'

export class updateCustomer{
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly firstname: string;

    @IsString()
    @IsNotEmpty()
    readonly lastname: string;
}
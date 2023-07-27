import {IsString, IsNotEmpty} from 'class-validator'

export class createUser{
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    readonly firstname: string;

    @IsNotEmpty()
    @IsString()
    readonly lastname: string;
}
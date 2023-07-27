import {IsString, IsNotEmpty} from 'class-validator'

export class createPC{
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;
}
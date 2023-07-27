import {IsString, IsNotEmpty} from 'class-validator'

export class updatePC{
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;
}

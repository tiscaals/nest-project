import {IsString, IsNotEmpty} from 'class-validator'

export class updateUsername{
    @IsString()
    @IsNotEmpty()
    readonly username: string;
}

export class updatePassword{
    @IsString()
    @IsNotEmpty()
    readonly password_lama: string;
    readonly password_baru: string;
}
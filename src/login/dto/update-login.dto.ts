import { PartialType } from '@nestjs/mapped-types';
import { loginDto } from './create-login.dto';

export class UpdateLoginDto extends PartialType(loginDto) {}

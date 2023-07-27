import { Module } from '@nestjs/common';
import { UserService } from './user.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { users } from 'models';
import { UserController } from './user.controller';
import { LoginService } from 'src/login/login.service';

@Module({
    imports: [SequelizeModule.forFeature([users])],
    controllers: [UserController],
    providers: [UserService, LoginService],
})
export class UserModule {}

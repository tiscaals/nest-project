import { CanActivate, ExecutionContext, ForbiddenException, HttpException, HttpStatus, Inject, Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { loginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import messageHelper from 'messegeHelper';
import { users } from 'models';

@Injectable()
export class LoginService {
  async login(loginDto: loginDto): Promise <any> {
    try {
      const user = await users.findOne({
          where: {username: loginDto.username}
      });
      if (user===null) {
          return messageHelper(undefined, 400, "Username not found!");
      }
      const result = await bcrypt.compare(loginDto.password, user.password);
      if (result === true) {
          const token = jwt.sign(
            { id: user.id, role: user.roles }, 
            process.env.SECRET_KEY, 
            { expiresIn: '1h' },
            { returning: true});
          return messageHelper(token, 200, "Berhasil login!");
      } else {
          return messageHelper("", 400, "Password salah!");
      }        
    } catch (error) {
        return messageHelper(error.message, 400, "Tidak bisa login!");
    }
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}

//Middleware
export class checkToken implements NestMiddleware {
  use(@Req() req: any, @Res() res: any, @Next() next:any) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: 'Authorization header is missing' });
    }
    try {
      const decoded = jwt.verify(authHeader, process.env.SECRET_KEY);
      if (decoded) {
        next();
      }
    } catch (error) {
      return res.status(401).send({ message: 'Invalid authorization token' });
    }
  }
}

//Auth Guard
// export class AuthGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest();
//     const token = request.headers.authorization;
//     console.log(token);
//     try {
//       jwt.verify(token, process.env.SECRET_KEY);
//       // console.log(decoded);
//       return true;
//     } catch (err) {
//       throw new ForbiddenException('Kamu ga bisa akses! Login dulu YGY');
//     }
//   }
// }
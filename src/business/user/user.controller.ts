import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Session,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { LoginInfoDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Session() session, @Body() body: LoginInfoDTO) {
    const { accountName, password } = body;
    const user = await this.userService.login(accountName, password);
    if (user) {
      session.user = user;
      return {
        code: 200,
      };
    } else {
      return {
        code: 401,
        msg: '账号或者密码错误',
      };
    }
  }
  @Post('findOne')
  async findOne(@Body() body: any) {
    const res = (await this.userService.findOne(body.name)) || 'no user';
    return res;
  }
  @Post('register')
  register(@Body() body: any) {
    return this.userService.register(body);
  }
}

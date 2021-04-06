import { Body, Controller, Get, Post, Request, Session } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('login')
  async login(@Session() session, @Body() body) {
    const { username, passwd } = body;
    const user = await this.userService.login(username, passwd);
    if (user) {
      session.user = user;
      return {
        code: 200,
      };
    } else {
      return {
        code: 401,
        msg: '账号密码错误',
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

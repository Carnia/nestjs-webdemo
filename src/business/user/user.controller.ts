import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Session,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { LoginInterceptor } from 'src/interceptor/login.interceptor';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { LoginInfoDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Session() session, @Body() body: LoginInfoDTO) {
    const { username, password } = body;
    const user = await this.userService.login(username, password);
    if (user) {
      session.user = user;
      return {
        code: 200,
        msg: '登陆成功',
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

  @UseInterceptors(LoginInterceptor)
  @Post('getUserInfo')
  async getUserInfo(@Session() session) {
    const res = { ...session.user };
    delete res.realName;
    delete res.password;
    delete res.salt;
    delete res.role;
    return {
      code: 200,
      data: res,
    };
  }

  @Post('register')
  register(@Body() body: any) {
    return this.userService.register(body);
  }
}

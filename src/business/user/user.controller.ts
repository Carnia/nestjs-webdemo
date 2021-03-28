import { Body, Controller, Get, Post, Request, Session } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('login')
  loginGet(@Request() req) {
    console.log('是否有session', req.session.user);
    return `
          <button id="login">login</button>
          <script>
            const $login = document.querySelector('#login')
            $login.addEventListener('click', function name(params) {
              fetch('http://localhost:3000/my/user/login',{
                method: 'POST',
                headers: new Headers({
                  'Content-Type': 'application/json'
                }),
                body: JSON.stringify({username:"lq2",passwd:"123"})
              })
              .then(()=>location.href='/my')
            })
          </script>`;
  }
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
  @Post('find')
  find(@Body() body: any, @Request() req) {
    console.log(req.session.username);
    return this.userService.find(body.name);
  }
  @Post('findOne')
  findOne(@Body() body: any) {
    return this.userService.findOne(body.name);
  }
  @Post('register')
  register(@Body() body: any) {
    return this.userService.register(body);
  }
}

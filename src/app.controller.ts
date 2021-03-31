import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  rootPage(@Request() req) {
    console.log('是否有session', req.session.user);
    return `
          <button id="login">login</button>
          <br>
          <a href="/carnia">home</a>
          ${JSON.stringify(req.session.user)}
          <script>
            const $login = document.querySelector('#login')
            $login.addEventListener('click', function name(params) {
              fetch('http://localhost:3000/carnia/user/login',{
                method: 'POST',
                headers: new Headers({
                  'Content-Type': 'application/json'
                }),
                body: JSON.stringify({username:"lq2",passwd:"123"})
              })
            })
          </script>`;
  }
}

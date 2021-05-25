import { logger } from './../../utils/log4js';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { DemoService } from './demo.service';
import { LoginInterceptor } from 'src/interceptor/login.interceptor';

@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}
  @UseInterceptors(LoginInterceptor)
  @Post('testLogin')
  register(@Request() req) {
    return {
      code: 200,
      msg: '已登录',
    };
  }
}

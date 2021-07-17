import { logger } from '../../utils/log4js';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginInterceptor } from 'src/interceptor/login.interceptor';
import { RoleInterceptor } from 'src/interceptor/role.interceptor';

@UseInterceptors(new RoleInterceptor(0))
@UseInterceptors(LoginInterceptor)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post('getUserList')
  register(@Request() req) {
    return {
      code: 200,
      data: {},
      msg: 'ok',
    };
  }
}

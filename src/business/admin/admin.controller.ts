import { logger } from '../../utils/log4js';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  Session,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginInterceptor } from 'src/interceptor/login.interceptor';
import { RoleInterceptor } from 'src/interceptor/role.interceptor';
import { PaginationDto } from './pageQuery.dto';
import { UserService } from '../user/user.service';

@UseInterceptors(new RoleInterceptor(0))
@UseInterceptors(LoginInterceptor)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userServer: UserService,
  ) {}
  @UsePipes(new ValidationPipe())
  @Post('getUserList')
  async getUserList(@Body() body: PaginationDto) {
    const userList = await this.adminService.getUserList(
      body.currentPage || 1,
      body.pageSize || 10,
    );
    return {
      code: 200,
      data: userList,
    };
  }
  @Post('setUserRole')
  async setUserRole(
    @Session() session,
    @Body() body: { userId: string; role: string },
  ) {
    const me = await this.userServer.findOne(session.user.username);
    if (me.role !== 0) {
      return {
        code: 403,
        msg: '没有权限',
      };
    }
    await this.adminService.setUserRole(body.userId, body.role);
    return {
      code: 200,
      data: {},
    };
  }
}

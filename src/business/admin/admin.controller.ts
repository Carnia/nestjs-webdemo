import { logger } from '../../utils/log4js';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginInterceptor } from 'src/interceptor/login.interceptor';
import { RoleInterceptor } from 'src/interceptor/role.interceptor';
import { PaginationDto } from './pageQuery.dto';

@UseInterceptors(new RoleInterceptor(0))
@UseInterceptors(LoginInterceptor)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
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
}

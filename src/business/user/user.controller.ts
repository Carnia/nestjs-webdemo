import { Body, Controller, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('find')
  find(@Body() body: any) {
    return this.userService.find(body.name);
  }
  @Post('findOne')
  findOne(@Body() body: any) {
    return this.userService.findOne(body.name);
  }
}

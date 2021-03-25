import { Controller, Get, Param, Query } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/list')
  list(@Query() query) {
    console.log(query);
    return this.blogService.getList() + JSON.stringify(query);
  }

  @Get('/p/:id')
  getPost(@Param() param): string {
    return JSON.stringify(param);
  }
}

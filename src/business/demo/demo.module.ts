import { DemoController } from './demo.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DemoController],
  providers: [DemoService],
})
export class DemoService {}

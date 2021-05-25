import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './business/user/user.module';
import { DemoService } from './business/demo/demo.module';

@Module({
  imports: [UserModule, DemoService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './business/user/user.module';
import { AdminModule } from './business/admin/admin.module';

@Module({
  imports: [UserModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

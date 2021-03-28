import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('my'); // 全局路由前缀
  app.use(cookieParser());
  app.use(
    session({
      name: 'sid',
      secret: 'lq2jh',
      saveUninitialized: true,
      resave: false,
      cookie: { maxAge: 60000 },
    }),
  );
  await app.listen(3000);
}
bootstrap();

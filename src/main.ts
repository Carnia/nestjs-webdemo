import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { logger } from './middleware/logger.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001',
    maxAge: 1800, // 表示隔30分钟才发起预检请求
    credentials: true, // 允许跨域使用设置cookie
  });
  app.setGlobalPrefix('carnia'); // 全局路由前缀
  app.use(cookieParser());
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // 监听所有的请求路由，并打印日志
  app.use(logger);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(
    session({
      name: 'sid',
      secret: 'lq2jh',
      saveUninitialized: true,
      resave: false,
      cookie: { maxAge: 1000 * 60 * 10 },
    }),
  );
  await app.listen(3000);
}
bootstrap();

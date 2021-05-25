// src/interceptor/transform.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '../utils/log4js';

@Injectable()
export class LoginInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    if (!req.session.user) {
      return of({
        code: 401,
        msg: '未登录',
      });
    }
    return next.handle();
  }
}

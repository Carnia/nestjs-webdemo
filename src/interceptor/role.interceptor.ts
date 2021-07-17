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
export class RoleInterceptor implements NestInterceptor {
  targetRole = 1; // 0-超级管理员|1-管理员|2-开发&测试&运营|3-普通用户（只能查看）
  constructor(targetRole?: number) {
    if (targetRole !== undefined) {
      this.targetRole = targetRole;
    }
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    if (req.session.user.role > this.targetRole) {
      return of({
        code: 403,
        msg: '没有权限',
      });
    }
    return next.handle();
  }
}

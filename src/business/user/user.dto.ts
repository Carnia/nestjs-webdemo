// src/business/user/user.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginInfoDTO {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '真实姓名必须是 String 类型' })
  readonly username: string;
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}

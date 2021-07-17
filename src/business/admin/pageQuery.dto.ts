// src/business/user/user.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PaginationDto {
  @IsNotEmpty({ message: 'currentPage不能为空' })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'currentPage必须为数字' },
  )
  readonly currentPage: number;
  @IsNotEmpty({ message: 'pageSize不能为空' })
  readonly pageSize: number;
}

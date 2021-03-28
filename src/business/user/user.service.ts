import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  find(name: string): string {
    return name;
  }
}

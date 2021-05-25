import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { Logger, logger } from 'src/utils/log4js';
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例

@Injectable()
export class DemoService {}

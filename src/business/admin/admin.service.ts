import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import { Logger, logger } from 'src/utils/log4js';
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例

@Injectable()
export class AdminService {
  /**
   * 查询是否有该用户
   * @param username 用户名
   */
  async getUserList(
    currentPage: number,
    pageSize: number,
  ): Promise<any | undefined> {
    const sql = `
      SELECT
        user_id userId, account_name username, real_name realName, mobile, role
      FROM
        user
      LIMIT ${currentPage - 1 > 0 ? currentPage - 1 : 0},${pageSize}
    `;
    try {
      const users = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: false, // 是否将 SQL 语句打印到控制台，默认为 true
      });
      return users;
    } catch (error) {
      Logger.error(error);
      return void 0;
    }
  }
}

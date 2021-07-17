import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { Logger, logger } from 'src/utils/log4js';
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例
import SnowflakeId from 'snowflake-id';

const guid = () => {
  const id = new SnowflakeId();
  return id.generate();
};
@Injectable()
export class UserService {
  /**
   * 登录
   * @param username
   * @param passwd
   * @returns
   */
  async login(username: string, passwd: string) {
    // "username": "lq2",
    const user = await this.findOne(username);
    const isOwn = user && user.password === encryptPassword(passwd, user.salt); // 加密密码
    return isOwn ? user : undefined;
  }
  /**
   * 查询是否有该用户
   * @param username 用户名
   */
  async findOne(username: string): Promise<any | undefined> {
    const sql = `
      SELECT
        user_id userId, account_name username, real_name realName, passwd password,
        passwd_salt salt, mobile, role
      FROM
        user
      WHERE
        account_name = '${username}'
    `; // 一段平淡无奇的 SQL 查询语句
    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: false, // 是否将 SQL 语句打印到控制台，默认为 true
      });
      const user = res[0]; // 查出来的结果是一个数组，我们只取第一个。
      logger.info('findOne - user', user);
      return user;
    } catch (error) {
      Logger.error(error);
      return void 0;
    }
  }
  /**
   * 注册
   * @param req
   * @returns
   */
  async register(req: any): Promise<any> {
    const { accountName, realName, password, repassword, mobile } = req;
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次密码输入不一致',
      };
    }
    const user = await this.findOne(accountName);
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt); // 加密密码
    const registerSQL = `
      INSERT INTO user
        (user_id, account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
      VALUES
        ('${guid()}', '${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 3, 0)
    `;
    try {
      await sequelize.query(registerSQL, { logging: false });
      return {
        code: 200,
        msg: 'Success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}

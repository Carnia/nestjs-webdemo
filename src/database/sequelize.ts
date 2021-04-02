import { Sequelize } from 'sequelize-typescript';
import db from '../config/db';
import { initDatabase } from './sql/initDatabase';
import { initUserTable } from './sql/initUserTable';

const doConnect = (database = '') => {
  return new Sequelize(database, db.mysql.user, db.mysql.password || null, {
    // 自定义主机; 默认值: localhost
    host: db.mysql.host, // 数据库地址
    // 自定义端口; 默认值: 3306
    port: db.mysql.port,
    dialect: 'mysql',
    pool: {
      max: db.mysql.connectionLimit, // 连接池中最大连接数量
      min: 0, // 连接池中最小连接数量
      acquire: 30000,
      idle: 10000, // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    },
    timezone: '+08:00', // 东八时区
  });
};

let defaultConnect = doConnect(db.mysql.database);
// 测试数据库链接
const testSyncDB = (connect) => {
  return connect.authenticate().then(() => {
    console.log('数据库连接成功');
    defaultConnect = connect;
  });
};

testSyncDB(defaultConnect).catch(
  (err: { original: any; name: string; parent: any }) => {
    // 数据库连接失败时打印输出
    console.log('数据库连接失败');
    if (err.original.sqlMessage.indexOf('Unknown database') === 0) {
      console.log('原因：没有初始化表, 初始化中...');
      const freeConnect = doConnect();
      freeConnect
        .query(initDatabase(db.mysql.database), { logging: false })
        .then((res) => {
          console.log('初始化成功');
          testSyncDB(defaultConnect);
          // 初始化admin-user表
          defaultConnect.query(initUserTable('admin_user'), { logging: false });
        })
        .catch((e) => {
          console.log('初始化失败', e);
        });
    } else {
      throw err;
    }
  },
);

export default defaultConnect;

// config/db.ts
const localConfig = {
  mysql: {
    port: 3306,
    host: 'carnia-al.mysql.rds.aliyuncs.com',
    user: 'carnia',
    password: 'lIqIAng000',
    database: 'nest_demo', // 库名
    connectionLimit: 2000, // 连接限制
  },
};

const productConfig = {
  mysql: {
    port: 3306,
    host: 'remotemysql.com',
    user: '7NLLUlDKrv',
    password: 'GL56ml44lG',
    database: '7NLLUlDKrv', // 库名
    connectionLimit: 10, // 连接限制
  },
};

// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
const config = process.env.NODE_ENV ? productConfig : localConfig;

export default config;

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default () => ({
  port: process.env.NODE_PORT,
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    type: process.env.DB_TYPE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: process.env.NODE_ENV === 'prod' ? false : true,
    namingStrategy: new SnakeNamingStrategy(),
  },
  multer: {
    dest: process.env.MULTER_DEST,
  },
  passport: {
    secret: process.env.SESSION_SECRET,
  },
  api: {
    key: process.env.API_KEY,
  },
  secret: {
    key: process.env.JWT_SECRET_KEY,
    expire: process.env.JWT_EXPIRE,
  },
});

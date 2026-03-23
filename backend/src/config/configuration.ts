type MongoConfig = {
  driver: 'mongodb';
  mongodb: {
    url: string | undefined;
  };
};

type PostgresConfig = {
  driver: 'postgres';
  postgres: {
    host: string | undefined;
    port: number;
    name: string | undefined;
    username: string | undefined;
    password: string | undefined;
  };
};

type DatabaseConfig = MongoConfig | PostgresConfig;

export default (): { port: number; database: DatabaseConfig } => {
  const driver = process.env.DATABASE_DRIVER as 'mongodb' | 'postgres';

  if (!driver) {
    throw new Error('DATABASE_DRIVER is not defined');
  }

  if (driver === 'mongodb') {
    return {
      port: parseInt(process.env.PORT ?? '3000', 10),
      database: {
        driver,
        mongodb: {
          url: process.env.DATABASE_URL,
        },
      },
    };
  }

  return {
    port: parseInt(process.env.PORT ?? '3000', 10),
    database: {
      driver,
      postgres: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
        name: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
      },
    },
  };
};

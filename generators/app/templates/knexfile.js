const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

const customConfigs = {
  development: {
    connection: {
      database: '<%= snakeCaseName %>',
      // username: "",
      // password: "",
    },
  },
  test: {
    connection: {
      database: '<%= snakeCaseName %>_test',
      // username: "",
      // password: "",
    },
  },
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };

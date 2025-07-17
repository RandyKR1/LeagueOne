function getDatabaseUri(env = process.env.NODE_ENV || 'development') {
  const dbName = env === 'test'
    ? process.env.DB_NAME_TEST
    : process.env.DB_NAME;

  return `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${dbName}`;
}

module.exports = { getDatabaseUri };

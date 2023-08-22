module.exports = {
  basic: {
    port: 4000,
  },

  authorizer: {
    secret: "basic-laundromat-app-secret",
  },

  database: {
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 4002,
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_DATABASE || "basic_laundromat",
  },
};

require('dotenv').config();

export default {
  env: process.env.NODE_ENV || 'development',
  server: {
    port: process.env.PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  database: {
    uri: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
  },
  serviceRegistry: {
    // url: process.env.SERVICE_REGISTRY_URL,
    url: `http://${process.env.SERVICE_REGISTRY_URL_HOST}:${process.env.SERVICE_REGISTRY_URL_PORT}`,
  },
};

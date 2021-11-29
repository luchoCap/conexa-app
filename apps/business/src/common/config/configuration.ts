export default () => ({
  environment: process.env.ENVIRONMENT,
  port: {
    business: parseInt(process.env.PORT_BUSINESS as string, 10),
  },
  mongo: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    loginExpired: process.env.JWT_LOGIN_EXPIRED_IN,
  },
  loginEndpoint: process.env.LOGIN_ENDPOINT,
});

export default () => ({
  environment: process.env.ENVIRONMENT,
  port: {
    login: parseInt(process.env.PORT_LOGIN as string, 10),
  },
  mongo: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    loginExpired: process.env.JWT_LOGIN_EXPIRED_IN,
  },
  businessService: process.env.BUSINESS_SERVICE,
});

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentsService {
  constructor(private readonly configService: ConfigService) {}
  get port(): number {
    const port = this.configService.get<number>('port.business');
    if (!port) throw new Error('PORT_BUSINESS is undefined');
    return port;
  }

  get environment(): string {
    const env = this.configService.get<string>('environment');
    if (!env) throw new Error('ENVIRONMENT is undefined');
    return env;
  }
  get mongoUri(): string {
    const mongo = this.configService.get<string>('mongo.uri');
    if (!mongo) throw new Error('MONGO_URI is undefined');
    return mongo;
  }

  get jwtSecret(): string {
    const jwt = this.configService.get<string>('jwt.secret');
    if (!jwt) throw new Error('JWT_SECRET is undefined');
    return jwt;
  }

  get jwtLoginExpired(): string {
    const jwtExpired = this.configService.get<string>('jwt.loginExpired');
    if (!jwtExpired) throw new Error('JWT_LOGIN_EXPIRED_IN is undefined');
    return jwtExpired;
  }

  get loginEndpoint(): string {
    const bService = this.configService.get<string>('loginEndpoint');
    if (!bService) throw new Error('LOGIN_ENDPOINT is undefined');
    return bService;
  }
}

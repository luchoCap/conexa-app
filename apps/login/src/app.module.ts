import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserService } from './services/user.service';
import { BusinessService } from './services/business.service';
import { envSchema } from './common/schemas/env.schema';
import configuration from './common/config/configuration';
import { EnvironmentsService } from './common/services/env.service';
import { UserModel } from './user.model';
import { AuthMiddleware } from './common/middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envSchema,
      load: [configuration],
      validationOptions: {
        abortEarly: true,
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongo.uri'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserModel }]),
  ],
  controllers: [AppController],
  providers: [UserService, BusinessService, EnvironmentsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/users');
  }
}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { envSchema } from './common/schemas/env.schema';
import configuration from './common/config/configuration';
import { EnvironmentsService } from './common/services/env.service';
import { UserModel } from './user.model';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { AppService } from './app.service';

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
  providers: [AppService, EnvironmentsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/getUsers');
  }
}

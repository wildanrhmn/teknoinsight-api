import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import appConfig from './app.config';
import databaseConfig from 'database.config';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { HttpModule } from '@nestjs/axios';

import { AuthController } from './modules/auth/auth.controller';
import { UserController } from './modules/user/user.controller';
import { AdminController } from './modules/admin/admin.controller';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env', 'local.env', 'prod.env'],
    load: [appConfig],
    isGlobal: true,
  }),
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: databaseConfig,
  }),
  AuthModule,
  HttpModule,
  UserModule,
  AdminModule,
],
  controllers: [AppController, AuthController, UserController, AdminController],
  providers: [AppService],
})
export class AppModule {}

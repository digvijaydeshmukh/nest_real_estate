import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorFilter } from './shared/error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { UserModule } from './user/user.module';




@Module({
  imports: [TypeOrmModule.forRoot(),CatsModule, UserModule],
  controllers: [AppController,],
  providers: [AppService,{
    provide:APP_FILTER,
    useClass:ErrorFilter
  },
  {
    provide:APP_INTERCEPTOR,
    useClass:LoggingInterceptor
  } 

],
})
export class AppModule {

}


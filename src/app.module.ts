import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from '@auth/roles.guard';
import { NestModule } from '@nestjs/common';
import { AuthGuard } from '@auth/auth.guard';
import { OrderModule } from './orders/orders.module';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
    cache: true,
  }),
  MongooseModule.forRootAsync({
    imports:[ConfigModule],
    useFactory:async (configService:ConfigService)=>({
      uri:`mongodb+srv://ngtrquochuy190999:${configService.get('DATABASE_PASSWORD')}@nestjscluster01.xskkghw.mongodb.net/?retryWrites=true&w=majority`
      
    }),
    inject:[ConfigService],
  }),
  // MongooseModule.forRoot('mongodb://localhost:27017'),
  UsersModule,
  ItemsModule,
  OrderModule,
  AuthModule,
  JwtModule.registerAsync({
    global:true,
    imports:[ConfigModule],
    useFactory : async (configService:ConfigService)=>({
      secret: configService.get<string>('JWT_SECRETKEY'),
    signOptions:{
      expiresIn:30000
    }
    }),
    inject:[ConfigService],
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

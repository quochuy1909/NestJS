import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.Controller';
import { UsersModule } from '@users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';




@Module({
  imports: [UsersModule],
  providers: [
    AuthService,
    {
      provide:APP_GUARD,
      useClass:AuthGuard
    },
    {
      provide:APP_GUARD,
      useClass:RolesGuard
    }
 ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
import { Role } from 'src/enum/role.enum';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
import { Roles } from '../decorator/role.decorator';
import { RolesGuard } from './roles.guard';
import { Bypass } from 'src/decorator/bypass.decorator';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    @Bypass(true)
    signIn(@Body() user:any) {
        const userInfo = {
            email:user.email,
            password:user.password
        }
      return this.authService.userSignIn(userInfo);
    }
    @Get('profile')
    // @UseGuards(AuthGuard,RolesGuard)
    @Roles([Role.User])
    // @Bypass(true)
    getProfile(@Request() req) {
      return req.user;
    }
  }
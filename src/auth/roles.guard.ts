import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Bypass } from 'src/decorator/bypass.decorator';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/role.enum';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try{
    const isPass = this.reflector.get(Bypass,context.getHandler())
    if(isPass) return true;
    const roles = this.reflector.getAllAndOverride<Role[]>(Roles.KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    // if (!roles) {
    //     roles = this.reflector.get(Roles,context.getClass());
    // }
    console.log(roles)
    if (!roles) {
      return true;
    }
    const {user} = await context.switchToHttp().getRequest();
    console.log('roles: ' ,user.roles)
    const isAuthorization = roles.some(role=>user.roles?.includes(role))
    console.log('Authorization ',isAuthorization)
    if(isAuthorization){
        return true;
    }
    else{
        throw new UnauthorizedException
    }
    }catch(err){
        throw new UnauthorizedException
    }
  }
}
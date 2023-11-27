import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Bypass } from "src/decorator/bypass.decorator";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private jwtService:JwtService,
        private reflector: Reflector
        ){}
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const isPass = this.reflector.get(Bypass,context.getHandler())
        if(isPass) return true;
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if(!token){
            throw new UnauthorizedException();
        }
        try{
            const payload = await this.jwtService.verifyAsync(token,
                {
                    secret:'ChickenApp'
                })
                console.log('payload: ',payload)
            request['user'] = payload;
        }catch(err){
            throw new UnauthorizedException();
        }
        return true;
    }
    
    private extractTokenFromHeader(request:Request):string|undefined {
        const [type,token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
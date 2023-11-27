import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "@users/dto/create-user.dto";
import UsersService from "@users/users.service";
import * as bcrypt from "bcrypt"
@Injectable()
export class AuthService{
    constructor(
        private jwtService:JwtService,
        private userService : UsersService
        ){}

    async userSignIn(user:any){
        const checkUser = await this.userService.checkUser(user)
        console.log(checkUser)
        if(checkUser.password){
            const payload ={
                sub: checkUser.id,
                roles: checkUser.roles
            }
            console.log(payload)
            return await this.jwtService.signAsync(payload);
        }
        return new UnauthorizedException;
    }

   
}
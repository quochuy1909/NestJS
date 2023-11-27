import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Bypass } from "src/decorator/bypass.decorator";
import { Roles } from "src/decorator/role.decorator";
import { Role } from "src/enum/role.enum";
import { CreateUserDto } from "./dto/create-user.dto";
import UsersService from "./users.service";

@Controller('api/user')
@Roles([Role.Admin])
export default class UsersController{
    constructor(private readonly usersService: UsersService){}
    @Get('list')
    // @Bypass(true)
    async getFindAll(){
        return this.usersService.findAll();
    }
    @Post('create')
    async createUser(@Body() createUser:CreateUserDto){
        return this.usersService.create(createUser);
    }
    @Put('update/:id')
    async updateUser(@Body() updateUser:CreateUserDto, @Param()id:string){
        return this.usersService.update(updateUser,id);
    }
    @Delete('delete/:id')
    async deleteUser(@Param()id:string){
        return this.usersService.delete(id);
    }
    // @Get('user/:id')
    // async getUser(@Param()id:string){
    //     return this.usersService.findItem(id);
    // }
    // @Post('create/user')
    // async createUserWithAccessToken(@Body() user:CreateUserDto){
    //     return this.usersService.createUserJWT(user)
    // }
    @Post('create/user')
    @Bypass(true)
    async createUserWithAccessToken(@Body() user:CreateUserDto){
        return this.usersService.signUpUser(user)
    }
    @Post('googlelogin')
    @Bypass(true)
    async googleLogin(@Body() accessToken:any){
        return this.usersService.getAccess(accessToken)
    }
    
}
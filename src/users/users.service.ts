import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthService } from "@auth/auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./schema/user.schema";
import * as bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

@Injectable()
export default class UsersService{
    constructor(
        // private authService: AuthService,
        @InjectModel(User.name) private userModel: Model<User>
        ){}
    
    async findAll(){
        return this.userModel.find();
    }
    async create(createUser:CreateUserDto){
        return this.userModel.create(createUser);
    }
    async update(updateUser:CreateUserDto,id){
        console.log(id.id)
        return this.userModel.findByIdAndUpdate(id.id,updateUser);
    }
    async delete(id){
        return this.userModel.findByIdAndDelete(id.id)
    }

    async signUpUser(user:CreateUserDto):Promise<any>{
        user={
            ...user,
            password: await bcrypt.hash(user.password,10)
        }
        return await this.userModel.create(user)
    }
    async checkUser(user:any):Promise<any> {
        console.log(user)
        const getUser = await this.userModel.findOne({email:user.email}).exec()
        console.log(getUser)
        const hashedPassword = getUser.password
        console.log(hashedPassword)
        return {password: bcrypt.compare(user.password,hashedPassword),
        roles: getUser.roles,
        id:getUser.id
        }
    }
    async getAccess(accessToken:any):Promise<any>{
        return accessToken;
    }

    async addOrderToUser(order_id:string,user:User){
        console.log('running ',order_id)
        const {email} = await this.userModel.findById(user)
        return await this.userModel.findOneAndUpdate({email:email},{order_id:order_id})
    }
}
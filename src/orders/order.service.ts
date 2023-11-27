import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "@users/schema/user.schema";
import UsersService from "@users/users.service";
import { ObjectId } from "mongodb";
import { Model } from "mongoose";
import { OrderDTO } from "./dto/order.dto";
import { Order } from "./schema/order.schema";

@Injectable()
export class OrderService{
    constructor(
        @InjectModel(Order.name) private orderModel : Model<Order>,
        private userService : UsersService
     ){}
    async createOrderByService(body: OrderDTO){
        
        const {_id,user} = await this.orderModel.create(body);
        console.log(_id.toString(),user)
        return await this.userService.addOrderToUser(_id.toString(),user);
    }
    async getAllOrder(){
        return await this.orderModel.find().populate('user').exec();
    }
}
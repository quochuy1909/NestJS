import { Body, Controller, Get, Post } from "@nestjs/common";
import { Bypass } from "src/decorator/bypass.decorator";
import { Roles } from "src/decorator/role.decorator";
import { Role } from "src/enum/role.enum";
import { OrderDTO } from "./dto/order.dto";
import { OrderService } from "./order.service";

@Controller('api/order')
@Roles([Role.User])
export class OrderController{
    constructor( private readonly orderService : OrderService ){}
    @Post('create')
    async createOrder(@Body() body:OrderDTO){
        return await this.orderService.createOrderByService(body);
    }
    @Get('list')
    @Bypass(true)
    async getAllOrder(){
        return await this.orderService.getAllOrder()
    }
}
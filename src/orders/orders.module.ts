import { AuthGuard } from "@auth/auth.guard";
import { RolesGuard } from "@auth/roles.guard";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "@users/users.module";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { Order, OrderSchema } from "./schema/order.schema";

@Module({
    imports:[MongooseModule.forFeature([{name:Order.name,schema:OrderSchema}]),
    UsersModule    
],
    controllers:[OrderController],
    providers:[OrderService,
        {
            provide:APP_GUARD,
            useClass: AuthGuard
        },
        {
            provide:APP_GUARD,
            useClass: RolesGuard
        },]
})
export class OrderModule{}
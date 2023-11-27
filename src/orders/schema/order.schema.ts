import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "@users/schema/user.schema";
import mongoose, { HydratedDocument } from "mongoose";
export type OrderDocument = HydratedDocument<Order>;
@Schema()
export class Order{
    @Prop({type: mongoose.Schema.Types.ObjectId,ref:'User'})
    user:User;

    @Prop()
    list_order_detail:string[]
}

export const OrderSchema = SchemaFactory.createForClass(Order);
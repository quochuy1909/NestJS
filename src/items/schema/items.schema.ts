import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/users/schema/user.schema";

export type ItemDocument = HydratedDocument<Item>
@Schema()
export class Item{
    @Prop()
    food_name:string;

    @Prop()
    quantity:number;

    @Prop()
    price:number;
    
    @Prop()
    description:string;

    @Prop()
    start:number;

    @Prop()
    image:string;

    @Prop()
    discount:number;
    
    // @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
    // user:User;
}
export const ItemSchema = SchemaFactory.createForClass(Item)
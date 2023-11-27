import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { type } from "os";
import { Item } from "../../items/schema/items.schema";

export type UserDocument = HydratedDocument<User>
@Schema()
export class User{
    @Prop()
    name:string;

    @Prop()
    age:number;

    @Prop({unique:true})
    email:string;

    @Prop()
    password:string;

    @Prop()
    accessToken:string;

    @Prop()
    roles: string[];

    @Prop({type: mongoose.Schema.Types.ObjectId,ref:'Order'})
    order_id: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
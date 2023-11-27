import { User } from "@users/schema/user.schema";
import { Date } from "mongoose";

export class OrderDTO{
    readonly user: User;
    readonly list_order_detail:string[]
}
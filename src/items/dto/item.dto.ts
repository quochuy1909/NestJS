import { User } from "src/users/schema/user.schema";

export class ItemDto{
    readonly food_name:string;
    readonly quantity:number;
    readonly price:number;
    readonly description:string;
    readonly start:number;
    readonly image:string;
    readonly discount:number;
}
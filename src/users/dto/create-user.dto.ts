export class CreateUserDto{
    readonly name:string;
    readonly age:number;
    readonly email:string;
    readonly password:string;
    readonly accesstoken:string;
    readonly roles:string[];
    readonly order_id:string[];
}
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ItemDto } from "./dto/item.dto";
import { Item } from "./schema/items.schema";

@Injectable()
export default class ItemService{
    constructor(@InjectModel(Item.name) private itemModel: Model<Item>){}

    async createItem(item:ItemDto):Promise<Item>{
        return this.itemModel.create(item);
    }
    async getItemList(){
        return this.itemModel.find();
    }
    async getItemDetail(id){
        return this.itemModel.findById(id.id)
    }
    async updateFood(id,food){
        console.log(id.id,food)
        return this.itemModel.findByIdAndUpdate(id.id,food)
    }
}
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Bypass } from "src/decorator/bypass.decorator";
import { Roles } from "src/decorator/role.decorator";
import { Role } from "src/enum/role.enum";
import { ItemDto } from "./dto/item.dto";
import ItemService from "./items.service";

@Controller('api')
export default class ItemController{
    constructor(private itemService: ItemService ){}
    
    @Post('create/food')
    @Roles([Role.Admin])
    async createItemController(@Body() item:ItemDto){
        return this.itemService.createItem(item);
    }
    @Get('food')
    @Bypass(true)
    async getItemController(){
        return this.itemService.getItemList();
    }
    @Get('food/:id')
    @Bypass(true)
    async getDetailItem(@Param()id:string){
        return this.itemService.getItemDetail(id);
    }
    @Put('update/food/:id')
    @Roles([Role.Admin])
    async updateFoodById(@Param()id:string,@Body() food:ItemDto){
        return this.itemService.updateFood(id,food);
    }
}
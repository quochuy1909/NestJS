import { AuthGuard } from "@auth/auth.guard";
import { RolesGuard } from "@auth/roles.guard";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import ItemController from "./items.controller";
import ItemService from "./items.service";
import { Item, ItemSchema } from "./schema/items.schema";

@Module({
    imports:[MongooseModule.forFeature([{name:Item.name,schema:ItemSchema}])],
    controllers:[ItemController],
    providers:[ItemService,
    {
        provide:APP_GUARD,
        useClass:AuthGuard
    },
    {
        provide:APP_GUARD,
        useClass:RolesGuard
    }
    ]
})
export class ItemsModule{}
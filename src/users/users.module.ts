import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema/user.schema";
import UsersController from "./users.controller";
import UsersService from "./users.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "@auth/auth.guard";
import { RolesGuard } from "@auth/roles.guard";


@Module({
    imports:[MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
    // AuthModule,
    
],
    controllers:[UsersController],
    providers:[UsersService,
    {
        provide:APP_GUARD,
        useClass: AuthGuard
    },
    {
        provide:APP_GUARD,
        useClass: RolesGuard
    },
    ],
    exports:[UsersService]
})
export class UsersModule {}
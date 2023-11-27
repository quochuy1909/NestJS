import { SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/enum/role.enum";

export const ROLES_KEY='roles';
export const Roles = Reflector.createDecorator<string[]>();
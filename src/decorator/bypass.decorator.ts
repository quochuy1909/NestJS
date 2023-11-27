import { Reflector } from "@nestjs/core";

export const Bypass = Reflector.createDecorator<boolean>();
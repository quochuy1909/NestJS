import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface EnvironmentVariables {
  PORT: number;
  TIMEOUT: string;
}
@Injectable()
export class AppService {
  constructor(private configService: ConfigService<{ DATABASE_USER: string }, true>){}
  getHello(): string {
    // return this.configService.get<string>('DATABASE_USER');
    console.log(this.configService.get('DATABASE_USER'))
    return 'Hello';
  }
}

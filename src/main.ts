import { AuthGuard } from '@auth/auth.guard';
import { RolesGuard } from '@auth/roles.guard';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.useGlobalGuards(app.select(AuthGuard).get(AuthGuard));
  await app.listen(4500);
}
bootstrap();

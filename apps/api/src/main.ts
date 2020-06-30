import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

//
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.connectMicroservice({
//     transport: Transport.REDIS,
//     options: { retryAttempts: 5, retryDelay: 1000 }
//   });
//
//   await app.listen(4200);
// }
// bootstrap();

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice(AppModule, {
//     transport: Transport.REDIS,
//     options: {
//       retryAttempts: 5,
//       retryDelay: 1000,
//       url: `redis://${REDIS_HOST}:${REDIS_PORT}`
//     }
//   });
//
//   await app.listenAsync();
// }
// bootstrap();
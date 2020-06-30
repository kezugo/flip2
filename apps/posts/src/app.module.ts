import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
// @ts-ignore
import posts from './posts.data.json';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic',
        },
      ], 
      uri: 'amqp://messaging:5672',
    }),
    AppModule,
  ],
  providers: [
    {
      provide: 'POSTS',
      useValue: posts
    },
    {
      provide: 'USERS_LOGIN_TIMESTAMP',
      useValue: []
    },
    AppService,
  ],
  controllers: [],
})
export class AppModule {}

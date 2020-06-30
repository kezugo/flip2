import { Controller, Get, Headers } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class AppController {

  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('feed')
  async feed(@Headers('user') user: string): Promise<any> {

    const response = await this.amqpConnection.request<any>({
      exchange: 'exchange1',
      routingKey: 'get-posts-for-user',
      payload: {
        userId: user,
      },
    }); 

    this.amqpConnection.publish('exchange1', 'user-requested-posts', {
      userId: user,
      timestamp: Date.now().toString(),
    });

    return response;
  }
}

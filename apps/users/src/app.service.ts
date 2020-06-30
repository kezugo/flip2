import { Injectable, Inject } from '@nestjs/common';
import { RabbitSubscribe, RabbitRPC } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class AppService {

  constructor(@Inject('USERS') private usersData: any[]) {}

  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'user-requested-posts',
  })
  public async updateUserLoginTimestamp(msg: {userId: string, timestamp: string}) {
    const index = this.usersData.findIndex(i => i.id === msg.userId);
    if(index !== -1) {
      this.usersData[index].lastLoginAt = msg.timestamp;
    }
    console.log(`Received message in users: ${JSON.stringify(msg)}`);
  }

  @RabbitRPC({
    exchange: 'exchange1',
    routingKey: 'user-login-timestamp',
  })
  async getUserLoginTimestamp(msg: {userId: string}): Promise<string> {
    const userLoginIndex = this.usersData.findIndex(i => i.id === msg.userId);
    return userLoginIndex !== -1 ? this.usersData[userLoginIndex].lastLoginAt : '0';
  }
}

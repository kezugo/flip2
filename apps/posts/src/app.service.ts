import { Injectable, Inject } from '@nestjs/common';
import { RabbitRPC, RabbitSubscribe, AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class AppService {

  constructor(@Inject('POSTS') private postsData: any[],
              private readonly amqpConnection: AmqpConnection,
              @Inject('USERS_LOGIN_TIMESTAMP') private userLogins: any[]   ) {}

  @RabbitRPC({
    exchange: 'exchange1',
    routingKey: 'get-posts-for-user',
    queue: 'get-posts-for-user',
  })
  async getPosts(msg: {userId: string}): Promise<any[]> {
    const userLoginIndex = this.userLogins.findIndex(i => i.userId === msg.userId);
    let timestamp;
    if(userLoginIndex === -1) {
      const response = await this.amqpConnection.request<any>({
        exchange: 'exchange1',
        routingKey: 'user-login-timestamp',
        payload: {
          userId: msg.userId,
        },
      });
      this.userLogins.push({
        lastLoginAt: response,
        userId: msg.userId,
      });
      timestamp = response || '1';
    } else {
      timestamp = this.userLogins[userLoginIndex].lastLoginAt;
    }
    return this.postsData.filter(i => parseInt(i.createdAt) > parseInt(timestamp))
        .map(i => ({postId: i.id, imageUrl: i.image}));
  }

  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'user-requested-posts',
  })
  public async updateUserLoginTimestamp(msg: {userId: string, timestamp: string}) {
    const index = this.userLogins.findIndex(i => i.userId === msg.userId);
    if(index !== -1) {
      this.userLogins[index].lastLoginAt = msg.timestamp;
    } else {
      this.userLogins.push({
        lastLoginAt: msg.timestamp,
        userId: msg.userId,
      });
    }
    console.log(`Received message in posts: ${JSON.stringify(msg)}`);
  }



}

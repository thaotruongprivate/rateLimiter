import { Injectable } from '@nestjs/common';
import {
  createClient,
  RedisClientType,
  RedisDefaultModules,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from 'redis';
import * as process from 'process';

type ClientType = RedisClientType<
  RedisDefaultModules & RedisModules,
  RedisFunctions,
  RedisScripts
>;
@Injectable()
export class RedisService {
  private client: ClientType;

  async onModuleInit() {
    console.log('Connecting to Redis...');
    this.client = await createClient({
      url: process.env.REDIS_URL,
    })
      .on('error', (err) => {
        console.log('Redis error: ', err);
      })
      .connect();
  }

  public async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }
  public async set(key: string, value: any, expiration = 60): Promise<string> {
    return await this.client.set(key, value, { EX: expiration });
  }

  async increment(key: string): Promise<number> {
    return await this.client.sendCommand(['INCR', key]);
  }

  async decrement(key: string): Promise<number> {
    return await this.client.sendCommand(['DECR', key]);
  }

  async getExpire(key: string): Promise<number> {
    return await this.client.sendCommand(['TTL', key]);
  }

  async onModuleDestroy() {
    console.log('Closing Redis connection');
    await this.client.quit();
  }
}

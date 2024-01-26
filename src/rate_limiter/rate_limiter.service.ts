import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

export const REQUESTS_PER_MINUTE = 5;

@Injectable()
export class RateLimiterService {
  private redis: RedisService;

  constructor(private readonly redisService: RedisService) {
    this.redis = redisService;
  }
  public async isAllowed(ipAddress: string): Promise<boolean> {
    const value = await this.redisService.get(ipAddress);
    if (value === null) {
      await this.redis.set(ipAddress, REQUESTS_PER_MINUTE - 1, 60);
      return true;
    }
    if (Number(value) > 0) {
      await this.redis.decrement(ipAddress);
      return true;
    }
    return false;
  }

  public async getTryAgain(ipAddress: string): Promise<number> {
    return await this.redis.getExpire(ipAddress);
  }
}

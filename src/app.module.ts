import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RateLimiterModule } from './rate_limiter/rate_limiter.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [RateLimiterModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

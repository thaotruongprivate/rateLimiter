import { Module } from '@nestjs/common';
import { RateLimiterService } from './rate_limiter.service';

@Module({
  providers: [RateLimiterService],
  exports: [RateLimiterService],
})
export class RateLimiterModule {}

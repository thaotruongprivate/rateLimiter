import { Injectable } from '@nestjs/common';
import { RateLimiterService } from './rate_limiter/rate_limiter.service';

@Injectable()
export class AppService {
  private rateLimiterService: RateLimiterService;
  constructor(rateLimiterService: RateLimiterService) {
    this.rateLimiterService = rateLimiterService;
  }
  home() {
    return 'Hello World!';
  }
}

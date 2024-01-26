import { Controller, Get, Ip, Response } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { RateLimiterService } from './rate_limiter/rate_limiter.service';

@Controller()
export class AppController {
  constructor(private readonly rateLimiter: RateLimiterService) {}
  @Get()
  async home(@Ip() ip: string, @Response() res: ExpressResponse) {
    if (!(await this.rateLimiter.isAllowed(ip))) {
      return res
        .setHeader(
          'X-Retry-After',
          (await this.rateLimiter.getTryAgain(ip)).toString(),
        )
        .status(429)
        .send('Too Many Requests');
    }
    return res.send('Hello World!');
  }
}

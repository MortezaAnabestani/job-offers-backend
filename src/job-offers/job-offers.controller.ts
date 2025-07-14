import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { JobOffersService } from './job-offers.service';

@Controller('api/job-offers')
export class JobOffersController {
  constructor(private readonly jobOffersService: JobOffersService) {}

  @Get()
  async getOffers(@Query() query: any) {
    const { page, limit } = query;

    if (page && (isNaN(page) || Number(page) < 1)) {
      throw new BadRequestException('Invalid "page" parameter. It must be a number greater than or equal to 1.');
    }

    if (limit && (isNaN(limit) || Number(limit) < 1)) {
      throw new BadRequestException('Invalid "limit" parameter. It must be a number greater than or equal to 1.');
    }

    return this.jobOffersService.getOffers(query);
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class JobOffersService {
  async getOffers(query: any) {
    const {
      title,
      location,
      salaryMin,
      salaryMax,
      page = 1,
      limit = 10,
    } = query;

    const skip = (page - 1) * limit;
    const where: any = {};

    if (title) where.title = { contains: title, mode: 'insensitive' };
    if (location) where.location = { contains: location, mode: 'insensitive' };
    if (salaryMin) where.salaryMin = { gte: Number(salaryMin) };
    if (salaryMax) where.salaryMax = { lte: Number(salaryMax) };

    const [data, total] = await Promise.all([
      prisma.jobOffer.findMany({
        where,
        skip: Number(skip),
        take: Number(limit),
        orderBy: { postedAt: 'desc' },
      }),
      prisma.jobOffer.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
      },
    };
  }
}

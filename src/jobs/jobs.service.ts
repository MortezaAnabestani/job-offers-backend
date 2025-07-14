import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UnifiedJobOffer } from '../transformers/types';

const prisma = new PrismaClient();

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  async upsertJob(job: UnifiedJobOffer) {
    try {
      await prisma.jobOffer.upsert({
        where: {
          externalId_source: {
            externalId: job.externalId,
            source: job.source,
          },
        },
        update: {}, 
        create: {
          externalId: job.externalId,
          title: job.title ?? 'No Title',
          company: job.company ?? 'Unknown Company',
          location: job.location,
          description: job.description ?? '',
          salaryMin: job.salaryMin,
          salaryMax: job.salaryMax,
          currency: job.currency,
          postedAt: job.postedAt,
          source: job.source,
        },
      });
    } catch (err) {
this.logger.error(
      `Error in saving job ${job.externalId} from ${job.source}: ${err.message}`,
      err.stack,
    );    }
  }
}

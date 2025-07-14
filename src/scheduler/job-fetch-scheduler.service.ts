import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Provider1Service } from '../providers/provider1.service';
import { Provider2Service } from '../providers/provider2.service';
import { JobsService } from '../jobs/jobs.service';
import { transformProvider1 } from '../transformers/provider1.transformer';
import { transformProvider2 } from '../transformers/provider2.transformer';

@Injectable()
export class JobFetchSchedulerService implements OnModuleInit {
    private readonly logger = new Logger(JobFetchSchedulerService.name);
  constructor(
    private readonly provider1Service: Provider1Service,
    private readonly provider2Service: Provider2Service,
    private readonly jobsService: JobsService,
  ) {}

  async onModuleInit() {
    await this.fetchAndStoreJobs();
  }

  async fetchAndStoreJobs() {
  this.logger.log('Job fetch started');

  try {
    const jobs1 = await this.provider1Service.fetchJobsFromProvider1();
    const jobs2Raw = await this.provider2Service.fetchJobsFromProvider2();

    let count = 0;

    for (const job of jobs1) {
      const unified = transformProvider1(job);
      await this.jobsService.upsertJob(unified);
      count++;
    }

    for (const [id, job] of Object.entries(jobs2Raw)) {
      const unified = transformProvider2(id, job);
      await this.jobsService.upsertJob(unified);
      count++;
    }

    this.logger.log(`Job fetch finished: ${count} jobs processed`);
  } catch (error) {
    this.logger.error('Job fetch failed', error.stack);
  }
}
}

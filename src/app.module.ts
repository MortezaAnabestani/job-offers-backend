import { Module } from '@nestjs/common';
import { Provider1Module } from './providers/provider1.module';
import { Provider2Module } from './providers/provider2.module';
import { ScheduleModule } from '@nestjs/schedule';
import { JobsModule } from './jobs/jobs.module';
import { JobFetchSchedulerService } from './scheduler/job-fetch-scheduler.service';
import { JobOffersModule } from './job-offers/job-offers.module';

@Module({
  imports: [
    Provider1Module,
    Provider2Module,
    JobsModule,
    JobOffersModule,
    ScheduleModule.forRoot(),
  ],
  providers: [JobFetchSchedulerService],
})
export class AppModule {}

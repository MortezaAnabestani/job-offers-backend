import { UnifiedJobOffer } from './types';

export function transformProvider2(jobId: string, job: any): UnifiedJobOffer {
  const postedAtDate = new Date(job.datePosted);

  return {
    externalId: jobId,
    title: job.position,
    company: job.employer?.companyName ?? 'Unknown Company',
    location: `${job.location?.city ?? 'Unknown City'}, ${job.location?.state ?? 'Unknown State'}`,
    description: '',
    salaryMin: job.compensation?.min ?? null,
    salaryMax: job.compensation?.max ?? null,
    currency: job.compensation?.currency ?? null,
    postedAt: !isNaN(postedAtDate.getTime()) ? postedAtDate : new Date(),
    source: 'provider2',
  };
}

import { UnifiedJobOffer } from './types';

export function transformProvider1(job: any): UnifiedJobOffer {
  const [min, max] = job.details.salaryRange
    .replace(/\$/g, '')
    .replace(/k/g, '000')
    .split('-')
    .map((s: string) => parseInt(s.trim()));

  return {
    externalId: job.jobId,
    title: job.title,
    company: job.company.name,
    location: job.details.location,
    description: '',
    salaryMin: min,
    salaryMax: max,
    currency: 'USD',
    postedAt: new Date(job.postedDate),
    source: 'provider1',
  };
}

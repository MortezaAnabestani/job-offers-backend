import { transformProvider2 } from '../../src/transformers/provider2.transformer';

describe('transformProvider2', () => {
  it('should convert provider2 data to unified format', () => {
    const id = 'job-321';

    const input = {
      position: 'Data Analyst',
      location: { city: 'London', state: 'LDN', remote: true },
      compensation: { min: 40000, max: 60000, currency: 'GBP' },
      employer: { companyName: 'Insight Ltd', website: 'https://insight.co.uk' },
      requirements: { experience: 3, technologies: ['Python', 'SQL'] },
      datePosted: '2025-07-12',
    };

    const result = transformProvider2(id, input);

    expect(result).toEqual({
      externalId: 'job-321',
      title: 'Data Analyst',
      company: 'Insight Ltd',
      location: 'London, LDN',
      description: '',
      salaryMin: 40000,
      salaryMax: 60000,
      currency: 'GBP',
      postedAt: new Date('2025-07-12'),
      source: 'provider2',
    });
  });
});

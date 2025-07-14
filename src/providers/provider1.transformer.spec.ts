import { transformProvider1 } from '../transformers/provider1.transformer';

describe('transformProvider1', () => {
  it('should convert provider1 data to unified format', () => {
    const input = {
      jobId: 'P1-999',
      title: 'Full Stack Developer',
      details: { location: 'Paris', salaryRange: '$50k - $80k' },
      company: { name: 'Tech Corp' },
      postedDate: '2025-07-10T12:00:00Z',
    };

    const result = transformProvider1(input);

    expect(result).toEqual({
      externalId: 'P1-999',
      title: 'Full Stack Developer',
      company: 'Tech Corp',
      location: 'Paris',
      salaryMin: 50000,
      salaryMax: 80000,
      currency: 'USD',
      postedAt: new Date('2025-07-10T12:00:00Z'),
      description: '',
      source: 'provider1',
    });
  });
});

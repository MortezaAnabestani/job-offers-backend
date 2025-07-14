export interface UnifiedJobOffer {
  externalId: string;
  title: string;
  company: string;
  location: string;
  description?: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  postedAt: Date;
  source: 'provider1' | 'provider2';
}

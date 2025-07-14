import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class Provider2Service {
  private readonly logger = new Logger(Provider2Service.name);
  private readonly apiUrl = 'https://assignment.devotel.io/api/provider2/jobs';

  async fetchJobsFromProvider2(): Promise<any[]> {
    try {
      const response = await axios.get(this.apiUrl);
      this.logger.log(`Fetched ${response.data.length} jobs from Provider2`);
      return response.data;
    } catch (error) {
      this.logger.error(
        `Failed to fetch data from Provider2: ${error.message}`,
      );
      return [];
    }
  }
}

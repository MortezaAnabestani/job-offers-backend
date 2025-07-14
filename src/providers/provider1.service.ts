import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class Provider1Service {
  private readonly logger = new Logger(Provider1Service.name);
  private readonly apiUrl = 'https://assignment.devotel.io/api/provider1/jobs';

  async fetchJobsFromProvider1(): Promise<any[]> {
    try {
      const response = await axios.get(this.apiUrl);
      this.logger.log(
        `Fetched ${response.data.jobs.length} jobs from Provider1`,
      );
      return response.data.jobs; 
    } catch (error) {
      this.logger.error(
        `Failed to fetch data from Provider1: ${error.message}`,
      );
      return [];
    }
  }
}

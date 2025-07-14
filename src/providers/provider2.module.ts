import { Module } from '@nestjs/common';
import { Provider2Service } from './provider2.service';

@Module({
  providers: [Provider2Service],
  exports: [Provider2Service],
})
export class Provider2Module {}

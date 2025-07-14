import { Module } from '@nestjs/common';
import { Provider1Service } from './provider1.service';

@Module({
  providers: [Provider1Service],
  exports: [Provider1Service],
})
export class Provider1Module {}

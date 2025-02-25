import { Module } from '@nestjs/common';
import { FixedAssetsService } from './fixed-assets.service';
import { FixedAssetsController } from './fixed-assets.controller';

@Module({
  controllers: [FixedAssetsController],
  providers: [FixedAssetsService],
})
export class FixedAssetsModule {}

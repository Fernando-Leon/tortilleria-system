import { Injectable } from '@nestjs/common';
import { CreateFixedAssetDto } from './dto/create-fixed-asset.dto';
import { UpdateFixedAssetDto } from './dto/update-fixed-asset.dto';

@Injectable()
export class FixedAssetsService {
  create(createFixedAssetDto: CreateFixedAssetDto) {
    return 'This action adds a new fixedAsset';
  }

  findAll() {
    return `This action returns all fixedAssets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fixedAsset`;
  }

  update(id: number, updateFixedAssetDto: UpdateFixedAssetDto) {
    return `This action updates a #${id} fixedAsset`;
  }

  remove(id: number) {
    return `This action removes a #${id} fixedAsset`;
  }
}

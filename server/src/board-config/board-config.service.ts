import { Injectable, Optional } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BoardConfig } from './board-config.schema';

@Injectable()
export class BoardConfigService {
  constructor(
    @Optional()
    @InjectModel(BoardConfig.name)
    private readonly boardConfigModel?: Model<BoardConfig>,
  ) {}

  async getConfig(): Promise<Partial<BoardConfig>> {
    if (!this.boardConfigModel) {
      return {
        rows: 50,
        cols: 50,
        size: 10,
        delay: 500,
      };
    }
    const config = await this.boardConfigModel.findOne().lean().exec();
    return {
      rows: config?.rows || 50,
      cols: config?.cols || 50,
      size: config?.size || 10,
      delay: config?.delay || 500,
    };
  }

  async seedBoardConfig(): Promise<void> {
    if (!this.boardConfigModel) {
      console.warn('No boardConfigModel available, skipping seed.');
      return;
    }
    await this.boardConfigModel.findOneAndDelete({
      _id: '67c712cc697576f9d8471a5a',
    });

    await this.boardConfigModel.create({
      _id: '67c712cc697576f9d8471a5a',
      rows: 50,
      cols: 50,
      size: 10,
      delay: 500,
    });
    console.log('Board config seeded');
  }
}

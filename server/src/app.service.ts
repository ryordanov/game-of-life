import { Injectable } from '@nestjs/common';
import { BoardConfigService } from './board-config/board-config.service';
import { BoardConfig } from './board-config/board-config.schema';

@Injectable()
export class AppService {
  constructor(private readonly boardConfigService: BoardConfigService) {}

  async getConfig(): Promise<Partial<BoardConfig>> {
    return await this.boardConfigService.getConfig();
  }

  sendNotification(message: string): { response: string } {
    return { response: `Roger that: (${message})` };
  }
}

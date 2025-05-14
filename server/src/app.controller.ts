import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { BoardConfig } from './types';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getConfig')
  async getConfig(): Promise<Partial<BoardConfig>> {
    return await this.appService.getConfig();
  }

  @Post('sendNotification')
  sendNotification(@Body('message') message: string): { response: string } {
    return this.appService.sendNotification(message);
  }
}

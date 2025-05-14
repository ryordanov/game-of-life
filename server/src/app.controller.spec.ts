import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardConfigService } from './board-config/board-config.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const mockBoardConfigService = {
      getConfig: jest.fn().mockResolvedValue({
        rows: 50,
        cols: 50,
        size: 10,
        delay: 500,
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: BoardConfigService,
          useValue: mockBoardConfigService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return board config object', async () => {
      const result = await appController.getConfig();
      expect(result).toEqual({
        rows: 50,
        cols: 50,
        size: 10,
        delay: 500,
      });
    });
  });
});

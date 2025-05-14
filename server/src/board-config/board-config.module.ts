import { Module, OnModuleInit, Optional } from '@nestjs/common';
import { BoardConfigService } from './board-config.service';
import { BoardConfig, BoardConfigSchema } from './board-config.schema';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

const mongoUri = process.env.MONGODB_URI;

const providers = [
  ...(mongoUri
    ? [
        {
          provide: 'BoardConfigModel',
          useFactory: (connection: Connection) => {
            return connection.model(BoardConfig.name, BoardConfigSchema);
          },
          inject: ['DatabaseConnection'],
        },
      ]
    : [
        {
          provide: 'BoardConfigModel',
          useValue: null,
        },
      ]),
  BoardConfigService,
];

@Module({
  imports: [
    ...(mongoUri
      ? [
          MongooseModule.forFeature([
            { name: BoardConfig.name, schema: BoardConfigSchema },
          ]),
        ]
      : []),
  ],
  providers,
  exports: [BoardConfigService, 'BoardConfigModel'],
})
export class BoardConfigModule implements OnModuleInit {
  constructor(
    private readonly boardConfigService: BoardConfigService,
    @Optional() private readonly configService?: ConfigService,
  ) {}

  async onModuleInit() {
    try {
      const enableSeed = this.configService?.get<string>('MONGODB_SEED');
      if (enableSeed === 'true') {
        await this.boardConfigService.seedBoardConfig();
      }
    } catch (err) {
      console.error('Error running board config seed:', err);
    }
  }
}

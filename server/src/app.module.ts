import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardConfigModule } from './board-config/board-config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ...(process.env.MONGODB_URI
      ? [
          MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
              const uri = configService.get<string>('MONGODB_URI');
              if (
                !uri ||
                (!uri.startsWith('mongodb://') &&
                  !uri.startsWith('mongodb+srv://'))
              ) {
                throw new Error('Invalid MongoDB connection string');
              }
              console.info('Connecting to MongoDB');
              return { uri };
            },
            inject: [ConfigService],
          }),
        ]
      : []),
    BoardConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

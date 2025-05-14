import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Request, Response } from 'express';
import * as path from 'path';
import { existsSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const staticPath = join(
    __dirname,
    '..',
    '..',
    'client',
    'dist',
    'client',
    'browser',
  );

  app.useStaticAssets(staticPath);

  const expressApp = app.getHttpAdapter().getInstance();

  expressApp.get(/^\/(?!api\/).*/, (_req: Request, res: Response) => {
    if (existsSync(staticPath)) {
      res.sendFile(path.resolve(staticPath, 'index.html'));
    } else {
      res.status(404).send('Angular app not found');
    }
  });

  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();

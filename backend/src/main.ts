import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './common/config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.setGlobalPrefix(configService.globalPrefix);

    const corsConfig = configService.cors;
    app.enableCors({
      origin: corsConfig.origin,
      credentials: corsConfig.credentials,
    });

    const config = new DocumentBuilder()
      .setTitle('Favorite Shortlist API')
      .setDescription(
        'API for managing users, resorts, and favorite resort lists. ' +
          'This API allows users to browse resorts in Thailand and create their favorite shortlists.',
      )
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const port = configService.port;
    await app.listen(port);

    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

void bootstrap();

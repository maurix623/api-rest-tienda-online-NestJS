import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('Descripción de la API')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    },
      'access-token')
    .addSecurityRequirements('access-token')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Exponer el JSON raw del spec
  app.getHttpAdapter().get('/api-json', (req, res) => {
    res.json(document);
  });

  // Montar Scalar
  app.use(
    '/docs',
    apiReference({
      url: '/api-json',
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
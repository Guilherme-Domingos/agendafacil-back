import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('AgendaFácil API')
    .setDescription(
      'API para sistema de agendamento AgendaFácil com autenticação JWT\n\n' +
        '## Autenticação\n\n' +
        'Esta API utiliza autenticação JWT com dois tipos de tokens:\n\n' +
        '- **Access Token**: Expira em 15 minutos, usado para acessar recursos\n' +
        '- **Refresh Token**: Expira em 7 dias, usado para renovar o access token\n\n' +
        '### Como começar:\n\n' +
        '1. **Cadastre-se** em `POST /auth/register` com nome, email e senha\n' +
        '2. **Faça login** em `POST /auth/login` com email e senha\n' +
        '3. Use o `accessToken` retornado no header `Authorization: Bearer <token>`\n' +
        '4. Quando o token expirar, use `POST /auth/refresh` com o refresh token\n\n' +
        '### Níveis de usuário:\n\n' +
        '- **USER**: Acesso básico\n' +
        '- **ADMIN**: Acesso administrativo completo',
    )
    .setVersion('1.0')
    .addTag('Tenant', 'Gerenciamento de tenants (organizações)')
    .addTag('Owner', 'Gerenciamento de proprietários')
    .addTag('Plan', 'Gerenciamento de planos de assinatura')
    .addTag('Service', 'Gerenciamento de serviços oferecidos')
    .addTag('Staff', 'Gerenciamento de funcionários')
    .addTag('Appointment', 'Gerenciamento de agendamentos')
    .addTag('Available Slot', 'Gerenciamento de slots de disponibilidade')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Insira o token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3333);
  console.log(
    `Application is running on: http://localhost:${process.env.PORT ?? 3333}`,
  );
  console.log(
    `Swagger is available at: http://localhost:${process.env.PORT ?? 3333}/api`,
  );
}
bootstrap();
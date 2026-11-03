import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("Math12Pro-Bootstrap");
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend Next.js app
  app.enableCors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    })
  );

  const port = process.env.BACKEND_PORT || 4000;
  await app.listen(port);
  logger.log(`🚀 Math12Pro NestJS Backend running at http://localhost:${port}`);
}

bootstrap();

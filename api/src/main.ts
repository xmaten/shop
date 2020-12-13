import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import Redis from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import 'reflect-metadata'

import { AppModule } from './app.module'
import { __prod__, COOKIE_NAME } from './constants'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const RedisStore = connectRedis(session)
  const redis = new Redis(process.env.REDIS_URL)

  app.enableCors({
    origin: true,
    credentials: true,
  })

  const options = new DocumentBuilder()
    .setTitle('Shop API')
    .setDescription('The shop API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    }),
  )

  await app.listen(5000)
}
bootstrap()

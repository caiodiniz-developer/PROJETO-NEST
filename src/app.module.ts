import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './infra/auth/auth.module.js'
import { AuthenticateController } from './infra/http/controllers/authenticate.controller.js'
import { CreateAccountController } from './infra/http/controllers/create-account.controller.js'
import { CreateQuestionController } from './infra/http/controllers/create-question.controller.js'
import { FetchRecentQuestionsController } from './infra/http/controllers/fetch-recent-questions.controller.js'
import { envSchema } from './infra/env.js'
import { PrismaService } from './infra/database/prisma/prisma.service.js'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService],
})
export class AppModule {}

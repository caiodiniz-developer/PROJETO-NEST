import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module.js'
import { CreateAccountController } from './controllers/create-account.controller.js'
import { envSchema } from './env.js'
import { PrismaService } from './prisma/prisma.service.js'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}

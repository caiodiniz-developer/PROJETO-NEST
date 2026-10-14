import { Module } from '@nestjs/common'
import { AppController } from './app.controller.js'
import { AppService } from './app.service.js'
import { CreateAccountController } from './controllers/create-account.controller.js'
import { PrismaService } from './prisma/prisma.service.js'

@Module({
  imports: [],
  controllers: [AppController, CreateAccountController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

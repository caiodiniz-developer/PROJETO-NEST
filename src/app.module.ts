import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller.js'
import { PrismaService } from './prisma/prisma.service.js'

@Module({
  imports: [],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}

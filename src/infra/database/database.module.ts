import { Module } from '@nestjs/common'
import { AnswerAttachmentsRepository } from '../../domain/forum/application/repositories/answer-attachments-repository.js'
import { AnswerCommentsRepository } from '../../domain/forum/application/repositories/answer-comments-repository.js'
import { AnswersRepository } from '../../domain/forum/application/repositories/answers-repository.js'
import { QuestionAttachmentsRepository } from '../../domain/forum/application/repositories/question-attachments-repository.js'
import { QuestionCommentsRepository } from '../../domain/forum/application/repositories/question-comments-repository.js'
import { QuestionsRepository } from '../../domain/forum/application/repositories/questions-repository.js'
import { StudentsRepository } from '../../domain/forum/application/repositories/students-repository.js'
import { PrismaService } from './prisma/prisma.service.js'
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository.js'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository.js'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository.js'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository.js'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository.js'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository.js'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository.js'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentsRepository,
    QuestionCommentsRepository,
    QuestionAttachmentsRepository,
    AnswersRepository,
    AnswerCommentsRepository,
    AnswerAttachmentsRepository,
  ],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common'
import { AuthenticateStudentUseCase } from '../../domain/forum/application/use-cases/authenticate-student.js'
import { CreateQuestionUseCase } from '../../domain/forum/application/use-cases/create-question.js'
import { FetchRecentQuestionsUseCase } from '../../domain/forum/application/use-cases/fetch-recent-questions.js'
import { RegisterStudentUseCase } from '../../domain/forum/application/use-cases/register-student.js'
import { CryptographyModule } from '../cryptography/cryptography.module.js'
import { DatabaseModule } from '../database/database.module.js'
import { AuthenticateController } from './controllers/authenticate.controller.js'
import { CreateAccountController } from './controllers/create-account.controller.js'
import { CreateQuestionController } from './controllers/create-question.controller.js'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller.js'
import { GetQuestionBySlugUseCase } from '../../domain/forum/application/use-cases/get-question-by-slug.js'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller.js'
import { EditQuestionUseCase } from '../../domain/forum/application/use-cases/edit-question.js'
import { EditQuestionController } from './controllers/edit-question.controller.js'
import { DeleteQuestionUseCase } from '../../domain/forum/application/use-cases/delete-question.js'
import { DeleteQuestionController } from './controllers/delete-question.controller.js'
import { AnswerQuestionUseCase } from '../../domain/forum/application/use-cases/answer-question.js'
import { AnswerQuestionController } from './controllers/answer-question.controller.js'
import { EditAnswerUseCase } from '../../domain/forum/application/use-cases/edit-answer.js'
import { EditAnswerController } from './controllers/edit-answer.controller.js'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
  ],
})
export class HttpModule {}

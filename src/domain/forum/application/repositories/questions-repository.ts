import type { PaginationParams } from '../../../../core/repositories/pagination-params.js'
import type { Question } from '../../enterprise/entities/question.js'
import type { QuestionDetails } from '../../enterprise/entities/value-objects/question-details.js'

export abstract class QuestionsRepository {
  abstract create(question: Question): Promise<void>
  abstract findBySlug(slug: string): Promise<Question | null>
  abstract findDetailsBySlug(slug: string): Promise<QuestionDetails | null>
  abstract findById(id: string): Promise<Question | null>
  abstract delete(question: Question): Promise<void>
  abstract save(question: Question): Promise<void>
  abstract findManyRecent(params: PaginationParams): Promise<Question[]>
}

import type { PaginationParams } from '../../../../core/repositories/pagination-params.js'
import type { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author.js'
import type { AnswerComment } from '../../enterprise/entities/answer-comment.js'

export abstract class AnswerCommentsRepository {
  abstract create(answerComment: AnswerComment): Promise<void>
  abstract findById(id: string): Promise<AnswerComment | null>
  abstract delete(answerComment: AnswerComment): Promise<void>
  abstract findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>
  abstract findManyByAnswerIdWithAuthor(
    answerId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]>
}

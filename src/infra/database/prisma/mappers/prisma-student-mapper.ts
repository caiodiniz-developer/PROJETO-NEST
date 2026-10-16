import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { Student } from '../../../../domain/forum/enterprise/entities/student.js'
import type {
  Prisma,
  User as PrismaUser,
} from '../../../../generated/prisma/client.js'

export class PrismaStudentMapper {
  static toDomain(raw: PrismaUser): Student {
    return Student.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
    }
  }
}

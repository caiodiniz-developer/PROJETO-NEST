import { Injectable } from '@nestjs/common'
import { faker } from '@faker-js/faker'
import { PrismaStudentMapper } from '../../src/infra/database/prisma/mappers/prisma-student-mapper.js'
import { PrismaService } from '../../src/infra/database/prisma/prisma.service.js'
import type { UniqueEntityId } from '../../src/core/entities/unique-entity-id.js'
import {
  Student,
  type StudentProps,
} from '../../src/domain/forum/enterprise/entities/student.js'

export function makeStudent(
  override: Partial<StudentProps> = {},
  id?: UniqueEntityId,
) {
  const student = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return student
}

@Injectable()
export class StudentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaStudent(data: Partial<StudentProps> = {}): Promise<Student> {
    const student = makeStudent(data)

    await this.prisma.user.create({
      data: PrismaStudentMapper.toPrisma(student),
    })

    return student
  }
}

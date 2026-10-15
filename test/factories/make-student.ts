import { faker } from '@faker-js/faker'
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

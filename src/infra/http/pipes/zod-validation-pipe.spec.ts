import { BadRequestException } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from './zod-validation-pipe.js'

describe('ZodValidationPipe', () => {
  const pipe = new ZodValidationPipe(
    z.object({
      email: z.string().email(),
    }),
  )

  it('should return the parsed value when it is valid', () => {
    expect(pipe.transform({ email: 'johndoe@example.com' })).toEqual({
      email: 'johndoe@example.com',
    })
  })

  it('should throw a bad request exception when value is invalid', () => {
    expect(() => pipe.transform({ email: 'invalid' })).toThrow(
      BadRequestException,
    )
  })
})

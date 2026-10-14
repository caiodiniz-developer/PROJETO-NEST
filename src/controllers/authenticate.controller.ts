import { Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Controller('/sessions')
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
  async handle() {
    const accessToken = this.jwt.sign({ sub: 'user-id' })

    return {
      access_token: accessToken,
    }
  }
}

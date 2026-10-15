import type { Encrypter } from '../../src/domain/forum/application/cryptography/encrypter.js'

export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}

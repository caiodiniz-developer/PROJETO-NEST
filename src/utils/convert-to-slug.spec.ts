import { convertToSlug } from './convert-to-slug.js'

describe('convertToSlug', () => {
  it('should convert a title to slug', () => {
    expect(convertToSlug('Example question title')).toEqual(
      'example-question-title',
    )
  })

  it('should remove accents and special characters', () => {
    expect(convertToSlug('Não é uma pergunta?!')).toEqual('nao-e-uma-pergunta')
  })

  it('should collapse repeated dashes and trailing dash', () => {
    expect(convertToSlug('Hello -- world _ ')).toEqual('hello-world')
  })
})

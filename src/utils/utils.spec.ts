import { capitalize, capitalizeWords } from './utils'

describe('utils', function () {
  it('should capitalize the first character of sentence and lowercase the rest', function () {
    const str = 'lorEm ipsUm dOlor sit'
    expect(capitalize(str)).toBe('Lorem ipsum dolor sit')
  })

  it('should capitalize the first character of sentence and preserve the rest', function () {
    const str = 'lorEm ipsUm dOlor sit'
    expect(capitalize(str, true)).toBe('LorEm ipsUm dOlor sit')
  })

  it('should capitalize all words of sentence', function () {
    const str = 'lorEm ipsUm dOlor sit'
    expect(capitalizeWords(str)).toBe('Lorem Ipsum Dolor Sit')
  })

  it('should capitalize all words of sentence and preserve the rest', function () {
    const str = 'lorEm ipsUm dOlor sit'
    expect(capitalizeWords(str, true)).toBe('LorEm IpsUm DOlor Sit')
  })
})

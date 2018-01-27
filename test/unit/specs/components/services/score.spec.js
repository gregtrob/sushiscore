import {RoundScore} from '@/store/services/score'

describe('Round Score', () => {
  it('Dumpling Score', () => {
    let rs = new RoundScore(0, 0,
      0, 0,
      0,
      0, 0,
      0, 0,
      0, 0)

    expect(rs.getDumplingScore(), '0 dumplings').to.equal(0)

    rs.dumplingCards = 1
    expect(rs.getDumplingScore(), '1 dumpling').to.equal(1)

    rs.dumplingCards = 2
    expect(rs.getDumplingScore(), '2 dumplings').to.equal(3)

    rs.dumplingCards = 3
    expect(rs.getDumplingScore(), '3 dumplings').to.equal(6)

    rs.dumplingCards = 4
    expect(rs.getDumplingScore(), '4 dumplings').to.equal(10)

    rs.dumplingCards = 5
    expect(rs.getDumplingScore(), '5 dumplings').to.equal(15)

    rs.dumplingCards = 6
    expect(rs.getDumplingScore(), '6 dumplings').to.equal(15)

    rs.dumplingCards = 20
    expect(rs.getDumplingScore(), '20 dumplings').to.equal(15)
  })
  it('Sashimi Score', () => {
    let rs = new RoundScore(0, 0,
      0, 0,
      0,
      0, 0,
      0, 0,
      0, 0)

    expect(rs.getSashimiScore(), '0 sashimi').to.equal(0)

    rs.sashimiCards = 1
    expect(rs.getSashimiScore(), '1 sashimi').to.equal(0)

    rs.sashimiCards = 2
    expect(rs.getSashimiScore(), '2 sashimi').to.equal(0)

    rs.sashimiCards = 3
    expect(rs.getSashimiScore(), '3 sashimi').to.equal(10)

    rs.sashimiCards = 4
    expect(rs.getSashimiScore(), '4 sashimi').to.equal(10)

    rs.sashimiCards = 5
    expect(rs.getSashimiScore(), '5 sashimi').to.equal(10)

    rs.sashimiCards = 6
    expect(rs.getSashimiScore(), '6 sashimi').to.equal(20)
  })
  it('Tempura Score', () => {
    let rs = new RoundScore(0, 0,
      0, 0,
      0,
      0, 0,
      0, 0,
      0, 0)

    expect(rs.getTempuraScore(), '0 tempura').to.equal(0)

    rs.tempuraCards = 1
    expect(rs.getTempuraScore(), '1 tempura').to.equal(0)

    rs.tempuraCards = 2
    expect(rs.getTempuraScore(), '2 tempura').to.equal(5)

    rs.tempuraCards = 3
    expect(rs.getTempuraScore(), '3 tempura').to.equal(5)

    rs.tempuraCards = 4
    expect(rs.getTempuraScore(), '4 tempura').to.equal(10)

    rs.tempuraCards = 5
    expect(rs.getTempuraScore(), '5 tempura').to.equal(10)

    rs.tempuraCards = 10
    expect(rs.getTempuraScore(), '10 tempura').to.equal(25)
  })
})

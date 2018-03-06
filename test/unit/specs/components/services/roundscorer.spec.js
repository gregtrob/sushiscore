import {Scorer, RoundScore} from '@/store/services/score'

function createMakiPoints (value) {
  return new RoundScore(value, 0,
    0, 0,
    0,
    0, 0,
    0, 0,
    0, 0)
}

describe('Round Score', () => {
  it('Single Maki First and Second', () => {
    const rs1 = createMakiPoints(3)
    const rs2 = createMakiPoints(2)
    const rs3 = createMakiPoints(1)

    Scorer.findMakiWinners([rs1, rs2, rs3])
    expect(6, 'RS1 - Winner').to.equal(rs1.makiScore)
    expect(3, 'RS2 - Second').to.equal(rs2.makiScore)
    expect(0, 'RS3 - None').to.equal(rs3.makiScore)

    Scorer.findMakiWinners([rs3, rs2, rs1])
    expect(6, 'RS1 - Winner').to.equal(rs1.makiScore)
    expect(3, 'RS2 - Second').to.equal(rs2.makiScore)
    expect(0, 'RS3 - None').to.equal(rs3.makiScore)
  })
  // need ties for first
  it('First place tie', () => {
    const rs1 = createMakiPoints(3)
    const rs2 = createMakiPoints(2)
    const rs3 = createMakiPoints(3)

    Scorer.findMakiWinners([rs1, rs2, rs3])

    // console.log([rs1, rs2, rs3])
    expect(rs1.makiScore, 'RS1').to.equal(3)
    expect(rs2.makiScore, 'RS2').to.equal(0)
    expect(rs3.makiScore, 'RS3').to.equal(3)
  })
  // need ties for second
  it('Second place tie', () => {
    const rs1 = createMakiPoints(3)
    const rs2 = createMakiPoints(2)
    const rs3 = createMakiPoints(2)

    Scorer.findMakiWinners([rs1, rs2, rs3])

    // console.log([rs1, rs2, rs3])
    expect(6, 'RS1 - Winner').to.equal(rs1.makiScore)
    expect(1, 'RS2 - Second').to.equal(rs2.makiScore)
    expect(1, 'RS3 - None').to.equal(rs3.makiScore)
  })
  // need 3 way tie with all 0s for all
  it('0 - 3 way tie', () => {
    const rs1 = createMakiPoints(0)
    const rs2 = createMakiPoints(0)
    const rs3 = createMakiPoints(0)

    Scorer.findMakiWinners([rs1, rs2, rs3])

    // console.log([rs1, rs2, rs3])
    expect(0, 'RS1 - Winner').to.equal(rs1.makiScore)
    expect(0, 'RS2 - Second').to.equal(rs2.makiScore)
    expect(0, 'RS3 - None').to.equal(rs3.makiScore)
  })
  // need to do with 8 players
  it('8 Players', () => {
    const rs1 = createMakiPoints(5)
    const rs2 = createMakiPoints(6)
    const rs3 = createMakiPoints(4)
    const rs4 = createMakiPoints(8)
    const rs5 = createMakiPoints(2)
    const rs6 = createMakiPoints(0)
    const rs7 = createMakiPoints(6)
    const rs8 = createMakiPoints(1)

    Scorer.findMakiWinners([rs1, rs2, rs3, rs4, rs5, rs6, rs7, rs8])

    // console.log([rs1, rs2, rs3])
    expect(rs1.makiScore, 'RS1').to.equal(0)
    expect(rs2.makiScore, 'RS2').to.equal(1)
    expect(rs3.makiScore, 'RS3').to.equal(0)
    expect(rs4.makiScore, 'RS4').to.equal(6)
    expect(rs5.makiScore, 'RS5').to.equal(0)
    expect(rs6.makiScore, 'RS6').to.equal(0)
    expect(rs7.makiScore, 'RS7').to.equal(1)
    expect(rs8.makiScore, 'RS8').to.equal(0)

    // console.log([rs1, rs2, rs3])
    expect(rs1.getTotal(), 'RS1').to.equal(0)
    expect(rs2.getTotal(), 'RS2').to.equal(1)
    expect(rs3.getTotal(), 'RS3').to.equal(0)
    expect(rs4.getTotal(), 'RS4').to.equal(6)
    expect(rs5.getTotal(), 'RS5').to.equal(0)
    expect(rs6.getTotal(), 'RS6').to.equal(0)
    expect(rs7.getTotal(), 'RS7').to.equal(1)
    expect(rs8.getTotal(), 'RS8').to.equal(0)
  })
  // first place not first in array
  it('First place not first', () => {
    const rs1 = createMakiPoints(6)
    const rs2 = createMakiPoints(8)
    const rs3 = createMakiPoints(9)

    Scorer.findMakiWinners([rs1, rs2, rs3])

    // console.log([rs1, rs2, rs3])
    expect(rs1.makiScore, 'RS1').to.equal(0)
    expect(rs2.makiScore, 'RS2').to.equal(3)
    expect(rs3.makiScore, 'RS3').to.equal(6)
  })
})

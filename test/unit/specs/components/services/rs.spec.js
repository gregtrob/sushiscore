import {RoundScore} from '@/store/services/score'

function createMakiPoints (value) {
  return new RoundScore(value, 0,
    0, 0,
    0,
    0, 0,
    0, 0,
    0, 0)
}

describe('Round Score', () => {
  it('Payload check', () => {
    const rs1 = createMakiPoints(3)
    let payload = {
      name: 'G',
      id: '134',
      rs: rs1
    }

    expect(rs1.makiPoints, 'RS1').to.equal(payload.rs.makiPoints)
  })
})

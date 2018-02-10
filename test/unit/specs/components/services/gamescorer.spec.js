import {Scorer, RoundScore, Player} from '@/store/services/score'

function createPlayer (name, r1Score, r2Score, r3Score, puddingCards) {
  // cheat and use the makiScore to set the score
  let player = new Player(name)
  const r1 = new RoundScore()
  r1.makiScore = r1Score
  r1.puddingCards = puddingCards
  player.rs1 = r1

  const r2 = new RoundScore()
  r2.makiScore = r2Score
  player.rs2 = r2

  const r3 = new RoundScore()
  r3.makiScore = r3Score
  player.rs3 = r3

  return player
}

function arrayForCheck (placesArray) {
  let idValues = []
  placesArray.forEach(element => {
    idValues.push(element.id)
  })
  return idValues
}

describe('Game Scorer', () => {
  // regular game
  it('Regular game', () => {
    const fred = createPlayer('Fred', 5, 5, 5, 6)
    const barney = createPlayer('Barney', 4, 4, 4, 5)
    const wilma = createPlayer('Wilma', 3, 3, 3, 4)
    const betty = createPlayer('Betty', 2, 2, 2, 3)
    const playerArray = [wilma, betty, fred, barney]

    let places = Scorer.scoreGame(playerArray)

    expect(fred.getGameScore(), 'Fred 21').to.equal(21) // 15 + 6 pudding points
    expect(barney.getGameScore(), 'Barney 12').to.equal(12) // 12
    expect(wilma.getGameScore(), 'Wilma 13').to.equal(9) // 9
    expect(betty.getGameScore(), 'Betty 0').to.equal(0) // 6 - 6

    // confirm playerArra is not shuffled
    expect(playerArray[0].id, 'Wilma in zero').to.equal(wilma.id)
    expect(playerArray[1].id, 'Betty in one').to.equal(betty.id)
    expect(playerArray[2].id, 'Fred in three').to.equal(fred.id)
    expect(playerArray[3].id, 'Barney in four').to.equal(barney.id)

    // add checks to be sure first is in position 0 and last is in last place
    expect(places.first.length, 'First place should be 1 entry').to.equal(1)
    expect(places.first[0].id, 'Fred in first').to.equal(fred.id)
    expect(places.second.length, 'Second place should be 1 entry').to.equal(1)
    expect(places.second[0].id, 'Barney in second').to.equal(barney.id)
    expect(places.third.length, 'Third place should be 1 entry').to.equal(1)
    expect(places.third[0].id, 'Wilma in third').to.equal(wilma.id)
    expect(places.participantTrophy.length, 'Participant should be 1 entry').to.equal(1)
    expect(places.participantTrophy[0].id, 'Betty in last').to.equal(betty.id)
  })
  // only 2 players
  it('Two players', () => {
    const fred = createPlayer('Fred', 5, 5, 5, 6)
    const betty = createPlayer('Betty', 2, 2, 2, 3)
    const playerArray = [betty, fred]

    let places = Scorer.scoreGame(playerArray)

    expect(fred.getGameScore(), 'Fred 21').to.equal(21) // 15 + 6 pudding points
    expect(betty.getGameScore(), 'Betty 0').to.equal(6) // 6

    // add checks to be sure first is in position 0 and last is in last place
    expect(places.first.length, 'First place should be 1 entry').to.equal(1)
    expect(places.first[0].id, 'Fred in first').to.equal(fred.id)
    expect(places.second.length, 'Second place should be 1 entry').to.equal(1)
    expect(places.second[0].id, 'Fred in first').to.equal(betty.id)
    expect(places.third.length, 'Third place should be 0 entry').to.equal(0)
    expect(places.participantTrophy.length, 'Participant should be 0 entry').to.equal(0)
  })
  // tied for pudding across all
  // mutliples in first
  // multiples in last
  it('Pudding same', () => {
    const fred = createPlayer('Fred', 5, 5, 5, 3)
    const barney = createPlayer('Barney', 4, 4, 4, 3)
    const wilma = createPlayer('Wilma', 3, 3, 3, 3)
    const betty = createPlayer('Betty', 2, 2, 2, 3)
    const playerArray = [wilma, betty, fred, barney]

    let places = Scorer.scoreGame(playerArray)

    expect(fred.getGameScore(), 'Fred 21').to.equal(15) // 15 pudding points
    expect(barney.getGameScore(), 'Barney 12').to.equal(12) // 12
    expect(wilma.getGameScore(), 'Wilma 9').to.equal(9) // 9
    expect(betty.getGameScore(), 'Betty 0').to.equal(6) // 6

    // add checks to be sure first is in position 0 and last is in last place
    expect(places.first.length, 'First place should be 1 entry').to.equal(1)
    expect(places.first[0].id, 'Fred in first').to.equal(fred.id)
    expect(places.second.length, 'Second place should be 1 entry').to.equal(1)
    expect(places.second[0].id, 'Barney in second').to.equal(barney.id)
    expect(places.third.length, 'Third place should be 1 entry').to.equal(1)
    expect(places.third[0].id, 'Wilma in third').to.equal(wilma.id)
    expect(places.participantTrophy.length, 'Participant should be 1 entry').to.equal(1)
    expect(places.participantTrophy[0].id, 'Betty in last').to.equal(betty.id)
  })
  // mutliples in first
  it('Multiples in first', () => {
    const fred = createPlayer('Fred', 5, 5, 5, 3)
    const barney = createPlayer('Barney', 5, 5, 5, 3)
    const wilma = createPlayer('Wilma', 3, 3, 3, 2)
    const betty = createPlayer('Betty', 2, 2, 2, 1)
    const playerArray = [wilma, betty, fred, barney]

    let places = Scorer.scoreGame(playerArray)

    expect(fred.getGameScore(), 'Fred 18').to.equal(18) // 15 + 3 pudding
    expect(barney.getGameScore(), 'Barney 18').to.equal(18) // 15 + 3 pudding
    expect(wilma.getGameScore(), 'Wilma 9').to.equal(9) // 15
    expect(betty.getGameScore(), 'Betty 0').to.equal(0) // 6 - 6 pudding

    // add checks to be sure first is in position 0 and last is in last place
    expect(places.first.length, 'First place should be 2 entry').to.equal(2)
    let checkArray = arrayForCheck(places.first)
    expect(checkArray, 'Array check for Fred & Barney First').to.have.members([fred.id, barney.id])
    expect(places.second.length, 'Second place should be 1 entry').to.equal(1)
    expect(places.second[0].id, 'Wilma in second').to.equal(wilma.id)
    expect(places.third.length, 'Third place should be 1 entry').to.equal(1)
    expect(places.third[0].id, 'Betty in third').to.equal(betty.id)
    expect(places.participantTrophy.length, 'Participant should be 0 entry').to.equal(0)
  })
  // multiples in second
  it('Multiples in second', () => {
    const fred = createPlayer('Fred', 5, 5, 5, 3)
    const barney = createPlayer('Barney', 5, 5, 5, 3)
    const wilma = createPlayer('Wilma', 3, 3, 3, 2)
    const betty = createPlayer('Betty', 3, 3, 3, 2)
    const playerArray = [wilma, betty, fred, barney]

    let places = Scorer.scoreGame(playerArray)

    expect(fred.getGameScore(), 'Fred 18').to.equal(18) // 15 + 3 pudding
    expect(barney.getGameScore(), 'Barney 18').to.equal(18) // 15 + 3 pudding
    expect(wilma.getGameScore(), 'Wilma 9').to.equal(6) // 9 - 3
    expect(betty.getGameScore(), 'Betty 9').to.equal(6) // 9 - 3

    // add checks to be sure first is in position 0 and last is in last place
    expect(places.first.length, 'First place should be 2 entry').to.equal(2)
    let checkArray = arrayForCheck(places.first)
    expect(checkArray, 'Array check for Fred & Barney First').to.have.members([fred.id, barney.id])
    expect(places.second.length, 'Second place should be 2 entries').to.equal(2)
    checkArray = arrayForCheck(places.second)
    expect(checkArray, 'Array check for Betty & Wilma Second').to.have.members([wilma.id, betty.id])
    expect(places.third.length, 'Third place should be 0 entry').to.equal(0)
    expect(places.participantTrophy.length, 'Participant should be 0 entry').to.equal(0)
  })
  // 8 players
  it('8 player', () => {
    const fred = createPlayer('Fred', 5, 5, 5, 3)
    const barney = createPlayer('Barney', 5, 5, 5, 3)
    const wilma = createPlayer('Wilma', 5, 3, 3, 2)
    const betty = createPlayer('Betty', 4, 3, 3, 2)
    const george = createPlayer('George', 1, 3, 3, 2)
    const jane = createPlayer('Jane', 7, 3, 5, 2)
    const judy = createPlayer('Judy', 5, 3, 4, 2)
    const elroy = createPlayer('Elroy', 4, 3, 4, 2)
    const playerArray = [wilma, betty, fred, barney, george, jane, judy, elroy]

    let places = Scorer.scoreGame(playerArray)

    expect(fred.getGameScore(), 'Fred 18').to.equal(18)
    expect(barney.getGameScore(), 'Barney 18').to.equal(18)
    expect(wilma.getGameScore(), 'Wilma 10').to.equal(10)
    expect(betty.getGameScore(), 'Betty 9').to.equal(9)
    expect(george.getGameScore(), 'George 6').to.equal(6)
    expect(jane.getGameScore(), 'Jane 14').to.equal(14)
    expect(judy.getGameScore(), 'Judy 11').to.equal(11)
    expect(elroy.getGameScore(), 'Elroy 10').to.equal(10)

    // add checks to be sure first is in position 0 and last is in last place
    expect(places.first.length, 'First place should be 2 entry').to.equal(2)
    let checkArray = arrayForCheck(places.first)
    expect(checkArray, 'Array check for Fred & Barney First').to.have.members([fred.id, barney.id])
    expect(places.second.length, 'Second place should be 1 entries').to.equal(1)
    expect(places.second[0].id, 'Second place should be Jane').to.equal(jane.id)
    expect(places.third.length, 'Third place should be 1 entry').to.equal(1)
    expect(places.third[0].id, 'Third place should be Judy').to.equal(judy.id)
    expect(places.participantTrophy.length, 'Everyone else is 4').to.equal(4)
    checkArray = arrayForCheck(places.participantTrophy)
    expect(checkArray, 'Array check for Wilma, Betty, Elroy & George').to.have.members([elroy.id, wilma.id, betty.id, george.id])
  })
})

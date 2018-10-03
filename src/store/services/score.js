import uuid from 'uuid-random'

class Player {
  id = null
  name = null
  rs1 = null
  rs2 = null
  rs3 = null
  gameScore = null

  constructor (name = 'My name is what') {
    this.name = name
    this.id = uuid()
  }

  getRoundScore (roundId) {
    let rs = null
    let intRoundId = parseInt(roundId)
    if (intRoundId === 1) {
      rs = this.rs1
    } else if (intRoundId === 2) {
      rs = this.rs2
    } else if (intRoundId === 3) {
      rs = this.rs3
    }

    if (rs) {
      return rs
    }

    return null
  }
}

class GameScore {
  r1Score = 0
  r2Score = 0
  r3Score = 0
  puddingScore = 0

  constructor (r1Score = 0, r2Score = 0, r3Score = 0, puddingScore = 0) {
    this.r1Score = r1Score
    this.r2Score = r2Score
    this.r3Score = r3Score
    this.puddingScore = puddingScore
  }

  getTotal () {
    return this.puddingScore + this.r1Score + this.r2Score + this.r3Score
  }
}

class RoundScore {
  makiPoints = 0
  makiScore = 0
  tempuraCards = 0
  sashimiCards = 0
  dumplingCards = 0
  puddingCards = 0
  nigiriCards = new NigiriCards()

  constructor (makiPoints = 0, tempuraCards = 0,
    sashimiCards = 0, dumplingCards = 0,
    puddingCards = 0,
    salmonNoWasabi = 0, salmonWithWasabi = 0,
    eggNoWasabi = 0, eggWithWasabi = 0,
    squidNoWasabi = 0, squidWithWasabi = 0) {
    this.makiPoints = makiPoints
    this.tempuraCards = tempuraCards
    this.sashimiCards = sashimiCards
    this.dumplingCards = dumplingCards
    this.puddingCards = puddingCards

    this.nigiriCards.setAllValues(salmonNoWasabi, salmonWithWasabi,
      eggNoWasabi, eggWithWasabi,
      squidNoWasabi, squidWithWasabi)
  }

  getCardScore () {
    const tempuraScore = this.getTempuraScore()
    const sashimiScore = this.getSashimiScore()
    const dumplingScore = this.getDumplingScore()

    const nigiriScore = this.nigiriCards.getNigiriScore()

    return tempuraScore + sashimiScore + dumplingScore + nigiriScore
  }

  getSashimiScore () {
    return (Math.floor(this.sashimiCards / 3)) * 10
  }

  getTempuraScore () {
    return (Math.floor(this.tempuraCards / 2)) * 5
  }

  getNigiriScore () {
    return this.nigiriCards.getNigiriScore()
  }

  getDumplingScore () {
    if (this.dumplingCards <= 0) {
      return 0
    }
    const dumplingArray = [1, 3, 6, 10, 15]

    let dumplingIndex = this.dumplingCards
    if (dumplingIndex > 5) {
      dumplingIndex = 5
    }
    dumplingIndex = dumplingIndex - 1

    if (dumplingIndex >= 0) {
      return dumplingArray[dumplingIndex]
    }

    return NaN
  }

  getTotal () {
    return this.getCardScore() + this.makiScore
  }

  clone () {
    const rs = new RoundScore(this.makiPoints, this.tempuraCards, this.sashimiCards,
      this.dumplingCards, this.puddingCards,
      this.salmonNoWasabi, this.salmonWithWasabi,
      this.eggNoWasabi, this.eggWithWasabi,
      this.squidNoWasabi, this.squidWithWasabi)
    return rs
  }
}

class NigiriCards {
  salmonNoWasabi=0
  salmonWithWasabi=0
  eggNoWasabi=0
  eggWithWasabi=0
  squidNoWasabi=0
  squidWithWasabi=0

  constructor (salmonNoWasabi = 0, salmonWithWasabi = 0,
    eggNoWasabi = 0, eggWithWasabi = 0,
    squidNoWasabi = 0, squidWithWasabi = 0) {
    this.setAllValues(salmonNoWasabi, salmonWithWasabi, eggNoWasabi, eggWithWasabi, this.squidNoWasabi, this.salmonWithWasabi)
  }

  setAllValues (salmonNoWasabi = 0, salmonWithWasabi = 0,
    eggNoWasabi = 0, eggWithWasabi = 0,
    squidNoWasabi = 0, squidWithWasabi = 0) {
    this.salmonNoWasabi = salmonNoWasabi
    this.salmonWithWasabi = salmonWithWasabi
    this.eggNoWasabi = eggNoWasabi
    this.eggWithWasabi = eggWithWasabi
    this.squidNoWasabi = squidNoWasabi
    this.squidWithWasabi = squidWithWasabi
  }

  getNigiriScore () {
    // A squid nigiri scores 3 points. If it is on top of a
    // wasabi card it scores 9.
    // A salmon nigiri scores 2 points. If it is on top of
    // a wasabi card it scores 6.
    // An egg nigiri scores 1 point. If it is on top of a
    // wasabi card it scores 3.

    const eggScore = (this.eggNoWasabi * 1) + (this.eggWithWasabi * 3)
    const salmonScore = (this.salmonNoWasabi * 2) + (this.salmonWithWasabi * 6)
    const squidScore = (this.squidNoWasabi * 3) + (this.squidWithWasabi * 9)
    return eggScore + salmonScore + squidScore
  }
}

const Scorer = {
  findMakiWinners (roundScores) {
    let firstPlaceScore = 0
    let secondPlaceScore = 0
    let firstPlaceArray = []
    let secondPlaceArray = []

    for (let i = 0; i < roundScores.length; i++) {
      const currentMaki = roundScores[i].makiPoints
      if (currentMaki > firstPlaceScore) {
        // whatever was first is now second
        secondPlaceScore = firstPlaceScore
        secondPlaceArray = []
        secondPlaceArray = secondPlaceArray.concat(firstPlaceArray)

        firstPlaceScore = currentMaki
        firstPlaceArray = []
        firstPlaceArray.push(roundScores[i])
      } else if (currentMaki === firstPlaceScore && currentMaki !== 0) {
        firstPlaceArray.push(roundScores[i])
      } else if (currentMaki > secondPlaceScore) {
        secondPlaceScore = currentMaki
        secondPlaceArray = []
        secondPlaceArray.push(roundScores[i])
      } else if (currentMaki === secondPlaceScore && currentMaki !== 0) {
        secondPlaceArray.push(roundScores[i])
      }
    }

    let makiFirstPoints = Math.trunc(6 / firstPlaceArray.length)
    firstPlaceArray.forEach(function (score) {
      score.makiScore = makiFirstPoints
    })

    // if there are multiple 1st place we don't do anything about 2nd place
    if (firstPlaceArray.length <= 1) {
      let makiSecondPoints = Math.trunc(3 / secondPlaceArray.length)
      secondPlaceArray.forEach(function (score) {
        score.makiScore = makiSecondPoints
      })
    }
  },

  scoreGame (playerArray) {
    // for pudding look for most and least
    // if 2 player only look for most

    let puddingHighScore = 0
    let puddingLowScore = 100 // or use maxint
    let puddingHighArray = []
    let puddingLowArray = []
    let allSame = false

    // the presumption is that for each round the same player is in the same position in the array
    // if we add player id later need to clean this up
    for (let i = 0; i < playerArray.length; i++) {
      const player = playerArray[i]
      const currentpuddingScore = player.rs1.puddingCards + player.rs2.puddingCards + player.rs3.puddingCards
      const gs = new GameScore(player.rs1.getTotal(),
        player.rs2.getTotal(),
        player.rs3.getTotal(),
        0)
      player.gameScore = gs

      if (currentpuddingScore > puddingHighScore) {
        puddingHighScore = currentpuddingScore
        puddingHighArray.length = 0
        puddingHighArray.push(player)
      } else if (currentpuddingScore === puddingHighScore && currentpuddingScore !== 0) {
        puddingHighArray.push(player)
      }

      if (currentpuddingScore < puddingLowScore) {
        puddingLowScore = currentpuddingScore
        puddingLowArray.length = 0
        puddingLowArray.push(player)
      } else if (currentpuddingScore === puddingLowScore) {
        puddingLowArray.push(player)
      }
    }

    if (puddingHighScore === puddingLowScore) {
      allSame = true
    }

    if (!allSame) {
      let puddingHighPoints = Math.trunc(6 / puddingHighArray.length)
      puddingHighArray.forEach(function (player) {
        player.gameScore.puddingScore = puddingHighPoints
      })

      if (playerArray.length !== 2) {
        let puddingLowPoints = Math.trunc(-6 / puddingLowArray.length)
        puddingLowArray.forEach(function (player) {
          player.gameScore.puddingScore = puddingLowPoints
        })
      }
    }

    let placeArray = playerArray.slice(0)
    placeArray.sort(function (a, b) {
      return b.gameScore.getTotal() - a.gameScore.getTotal()
    })

    // do i return the array here OR do i return something like
    // {
    //  first: firstPlaceArray,
    //  second: secondPlaceArray,
    //  third: thirdPlaceArray,
    //  full: playerArray
    // }
    // alternatives are to tag each user with their finish place? ....
    let priorScore = -1
    let place = 1
    let places = {
      first: [],
      second: [],
      third: [],
      participantTrophy: []
    }
    let i = 0
    for (; i < placeArray.length && place < 4; i++) {
      let currentItem = placeArray[i]
      let currentScore = currentItem.gameScore.getTotal()
      if (priorScore === -1) {
        priorScore = currentScore
      }

      if (priorScore === currentScore) {
        if (place === 1) {
          places.first.push(currentItem)
        } else if (place === 2) {
          places.second.push(currentItem)
        } else if (place === 3) {
          places.third.push(currentItem)
        }
      } else {
        place++
        if (place === 2) {
          places.second.push(currentItem)
        } else if (place === 3) {
          places.third.push(currentItem)
        }
      }

      priorScore = currentItem.gameScore.getTotal()
    }
    // console.log(places)
    // console.log('i is ' + i)
    if ((places.first.length + places.second.length + places.third.length) < playerArray.length) {
      places.participantTrophy = placeArray.slice(i - 1)
    }

    return places
  }
}

export {RoundScore, NigiriCards, Scorer, Player}

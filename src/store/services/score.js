class RoundScore {
  makiPoints = 0
  makiScore = 0
  tempuraCards = 0
  sashimiCards = 0
  dumplingCards = 0
  puddingCards = 0
  theScore = 0
  nigiriCards = null

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

    this.nigiriCards = new NigiriCards(salmonNoWasabi, salmonWithWasabi,
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

  scoreGame (round1Scores, round2Scores, round3Scores) {

  }
}

export {RoundScore, NigiriCards, Scorer}

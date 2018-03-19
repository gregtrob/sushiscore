class A {
  v1 = null
  v2 = null 
  v3 = null 
}

class V {
  value = null 
}

describe('Array test', () => {
  it('Value check', () => {
    const a1 = new A() 
    const a2 = new A() 

    const values = [a1, a2]

    console.log(values)

    const v1 = new V()
    v1.value = 'Boogers'

    a2.v1 = v1 

    console.log(values)


  })
})

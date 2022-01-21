import { makeRandomName } from '@myscope/core'
import type { Animal, Size } from './animal'

interface Dog extends Animal {
  woof(): void
  name: string
}

const sizes = 'small medium large'.split(' ')
const barks = 'Woof Yap Growl'.split(' ')

function createDog(): Dog {
  return {
    size: sizes[Math.floor(Math.random() * sizes.length)] as Size,
    woof: function (this: Dog) {
      return `${this.name} says ${
        barks[Math.floor(Math.random() * barks.length)]
      }`
    },
    name: makeRandomName()
  }
}

export { Dog, createDog }

import { render } from './render'

const myName = 'Junya'
const age = 22

//TODO 如果 tsconfig.json 中如开启 removeComments 则会删除注释
// function getArray<T>(...args: T[]): T[] {
//   return [...args]
// }

//TODO 如 tsconfig.json 中 target > ES5 则会保留相应 JS 高级语法
const getArray = <T>(...args: T[]): T[] => {
  return [...args]
}

console.log(getArray('foo', 'bar'))
console.log(getArray(1, 2, 2, 3, 4, 5))

function testChunkFile() {
  render()
}

testChunkFile()

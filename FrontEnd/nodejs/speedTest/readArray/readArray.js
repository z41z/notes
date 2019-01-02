// 内存溢出
// node --max-old-space-size=2048 speedTest.js

let result = []

/**
 * 时间排序
 */
const sortResultByTime = () => {
  result.sort((a, b) => {
    return a.time - b.time
  })
  console.log(result)
}

/**
 * while-push
 * @param {Number} length 
 */
const newArrayByWhilePush = (length = 0) => {
  let timeStart = new Date()
  let arr = []
  while (length) {
    arr.push([Math.random(), Math.random(), Math.random()])
    length--
  }
  let timeEnd = new Date()
  result.push({
    name: 'newArrayByWhilePush',
    time: timeEnd - timeStart
  })
  return arr
}

let wp = newArrayByWhilePush(5e6)

/**
 * read-for
 * @param {Array} wp 
 */
const readArrayByFor = (wp) => {
  let timeStart = new Date()
  let a = 0
  for (let i = 0; i < wp.length; i++) {
    a++
  }
  let timeEnd = new Date()
  result.push({
    name: 'readArrayByFor',
    time: timeEnd - timeStart
  })
}

/**
 * read-while
 * @param {Array} wp 
 */
const readArrayByWhile = (wp) => {
  let timeStart = new Date()
  let a = 0
  let length = wp.length
  while (length) {
    a++
    length--
  }
  let timeEnd = new Date()
  result.push({
    name: 'readArrayByWhile',
    time: timeEnd - timeStart
  })
}

/**
 * read-forEach
 * @param {Array} wp 
 */
const readArrayByForEach = (wp) => {
  let timeStart = new Date()
  let a = 0
  wp.forEach(item => {
    a++
  })
  let timeEnd = new Date()
  result.push({
    name: 'readArrayByForEach',
    time: timeEnd - timeStart
  })
}

readArrayByFor(wp)
readArrayByWhile(wp)
readArrayByForEach(wp)
sortResultByTime()
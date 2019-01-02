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

/**
 * for-push
 * @param {Number} length 
 */
const newArrayByForPush = (length = 0) => {
  let timeStart = new Date()
  let arr = []
  for (let i = 0; i < length; i++) {
    arr.push([Math.random(), Math.random(), Math.random()])
  }
  let timeEnd = new Date()
  result.push({
    name: 'newArrayByForPush',
    time: timeEnd - timeStart
  })
  return arr
}

/**
 * for-push-reverse
 * @param {Number} length 
 */
const newArrayByForPushReverse = (length = 0) => {
  let timeStart = new Date()
  let arr = []
  for (let i = length; i > 0; i--) {
    arr.push([Math.random(), Math.random(), Math.random()])
  }
  let timeEnd = new Date()
  result.push({
    name: 'newArrayByForPushReverse',
    time: timeEnd - timeStart
  })
  return arr
}

/**
 * for-length
 * @param {Number} length 
 */
const newArrayByForLength = (length = 0) => {
  let timeStart = new Date()
  let arr = []
  for (let i = 0; i < length; i++) {
    arr[arr.length] = [Math.random(), Math.random(), Math.random()]
  }
  let timeEnd = new Date()
  result.push({
    name: 'newArrayByForLength',
    time: timeEnd - timeStart
  })
  return arr
}

/**
 * while-length
 * @param {Number} length 
 */
const newArrayByWhileLength = (length = 0) => {
  let timeStart = new Date()
  let arr = []
  while (length) {
    arr[arr.length] = [Math.random(), Math.random(), Math.random()]
    length--
  }
  let timeEnd = new Date()
  result.push({
    name: 'newArrayByWhileLength',
    time: timeEnd - timeStart
  })
  return arr
}

newArrayByForPushReverse(5e6)
newArrayByWhilePush(5e6)
newArrayByForPush(5e6)
newArrayByForLength(5e6)
newArrayByWhileLength(5e6)

sortResultByTime()
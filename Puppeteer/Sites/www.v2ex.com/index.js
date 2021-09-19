/**
 * V2EX签到
 */
const schedule = require('node-schedule');
const { send } = require('./mail')
const chalk = require('chalk')
const puppeteer = require('puppeteer-core')
async function v2ex() {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "./data",
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  })
  const page = await browser.newPage()
  await page.goto('https://v2ex.com')
  await page.goto('https://v2ex.com/mission/daily')
  const nickName = await page.$eval('#Top > div > div > div.tools > a:nth-child(2)', (e) => e.innerText)
  // nickName为签到昵称
  if (nickName === '签到昵称') {
    let el = await page.$('#Main > div.box > div:nth-child(2) > input')
    await el.click()
    await page.waitForNavigation({ waitUntil: 'networkidle0' })
    send({
      subject: "V2EX登陆成功",
      text: "V2EX登陆成功",
      html: "V2EX登陆成功"
    })
  } else {
    send({
      subject: "V2EX会话过期",
      text: "V2EX会话过期",
      html: "V2EX会话过期"
    })
  }
  await browser.close()
}
console.log(chalk.black.bgGreen(new Date()))
console.log(chalk.black.bgBlue('程序已启动'))
let job = schedule.scheduleJob('0 0 9 * * *', () => {
  console.log(chalk.black.bgGreen(new Date()));
  v2ex()
});
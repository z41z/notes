/**
 * 成交结果
 */
const puppeteer = require("puppeteer-core")
const fs = require('fs');
let PAGE_TOTAL = 2;
const URL = 'http://www.cdlr.gov.cn/second/zpggg.aspx?ClassID=001002002006001';

const parseData = () => {
  let content = [];
  let codeArr = [];
  fs.readFile('./result.json', function (err, res) {
    let data = (res.toString().replace(/\]\[/ig, ',').replace(/,,/ig,','))
    JSON.parse(data).forEach(item => {
      if (codeArr.indexOf(item.code) < 0) {
        codeArr.push(item.code)
        content.push(item)
      }
    })
    fs.writeFile('./result.json', JSON.stringify(content), function (err) {})
  })
}

const scrape = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 50000,
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  })

  const page = await browser.newPage()

  await page.goto(URL)
  await page.waitForSelector('#AspNetPager1_input')
  await page.select('#AspNetPager1_input', "" + PAGE_TOTAL);
  await page.waitFor(3000)
  let subUrls = await page.evaluate(() => {
    let urls = []
    document.querySelectorAll('#sty > div.xxright > div > table > tbody > tr  > td> a').forEach(url => {
      urls.push(url.href)
    })
    return urls;
  })

  for (let i = 0; i < subUrls.length; i++) {
    await page.goto(subUrls[i])
    let infos = await page.evaluate(() => {
      let detail = [];
      document.querySelectorAll('#myFonts > div:nth-child(2) table  tbody tr').forEach((item, index) => {
        if (index > 1) {
          let code = item.querySelector('td:nth-child(2)').innerText || ''
          let endPrice = item.querySelector('td:nth-child(5)').innerText || ''
          let endPriceTotal = item.querySelector('td:nth-child(6)').innerText || ''
          let owner = item.querySelector('td:nth-child(7)').innerText || ''
          detail.push({
            url: location.href,
            code,
            endPrice,
            endPriceTotal,
            owner
          })
        }
      })

      return detail;

    });

    console.log(infos)
    fs.appendFile('./result.json', JSON.stringify(infos), function (res) {})
  }

  if (PAGE_TOTAL > 1) {
    PAGE_TOTAL--;
    scrape()
  }
  parseData()
}

scrape();
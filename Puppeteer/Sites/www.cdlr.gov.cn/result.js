/**
 * 成交结果
 */
const puppeteer = require("puppeteer-core")
const fs = require('fs');
const chalk = require('chalk');
let PAGE_NUM = 60;
const URL = 'http://www.cdlr.gov.cn/second/zpggg.aspx?ClassID=001002002006001';


const scrape = async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    timeout: 50000,
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  })

  const page = await browser.newPage()

  await page.setDefaultNavigationTimeout(120000)
  for (let m = 39; m < PAGE_NUM; m++) {
    let result = [];
    await page.goto(URL)
    await page.waitFor(3000)
    await page.evaluate((m) => {
      __doPostBack('AspNetPager1', "" + m)
    }, m);
    await page.waitForNavigation({
      waitUntil: 'networkidle0'
    })
    let subUrls = await page.evaluate(() => {
      let urls = []
      document.querySelectorAll('#sty > div.xxright > div > table > tbody > tr  > td> a').forEach(url => {
        urls.push(url.href)
      })
      return urls;
    })

    for (let i = 0; i < subUrls.length; i++) {
      await page.goto(subUrls[i])
      console.log(`${chalk.yellow(new Date)}`)
      console.log(`页${chalk.blue(m)}链接【${chalk.blue(i+1)}】:${chalk.green(subUrls[i])}`)
      let infos = await page.evaluate(() => {
        let detail = [];
        document.querySelectorAll('#myFonts table  tbody tr').forEach((item, index) => {
          if (index > 0) {
            let code = ''
            let endPrice = ''
            let endPriceTotal = ''
            let owner = ''
            if (!item.querySelector('td:nth-child(7)')) {
              if (item.querySelector('td:nth-child(6)')) {
                if (item.querySelector('td:nth-child(6)').innerText == '&nbsp;') {
                  code = item.querySelector('td:nth-child(1)').innerText || ''
                  endPrice = item.querySelector('td:nth-child(4)').innerText == '/' ? '0' : item.querySelector('td:nth-child(4)').innerText
                  endPriceTotal = item.querySelector('td:nth-child(4)').innerText == '/' ? '0' : item.querySelector('td:nth-child(4)').innerText
                  owner = item.querySelector('td:nth-child(5)').innerText || ''
                }
                else{
                  // http://www.cdlr.gov.cn/detailnoright.aspx?id=38579
                  code = item.querySelector('td:nth-child(2)').innerText || ''
                  endPrice = item.querySelector('td:nth-child(5)').innerText == '/' ? '0' : item.querySelector('td:nth-child(5)').innerText
                  endPriceTotal = item.querySelector('td:nth-child(5)').innerText == '/' ? '0' : item.querySelector('td:nth-child(5)').innerText
                  owner = item.querySelector('td:nth-child(6)').innerText || ''
                }
              } else {
                // http://www.cdlr.gov.cn/detailnoright.aspx?id=32775
                if(item.querySelector('td:nth-child(2)')){
                  code = item.querySelector('td:nth-child(1)').innerText || ''
                  endPrice = item.querySelector('td:nth-child(4)').innerText == '/' ? '0' : item.querySelector('td:nth-child(4)').innerText
                  endPriceTotal = item.querySelector('td:nth-child(4)').innerText == '/' ? '0' : item.querySelector('td:nth-child(4)').innerText
                  owner = item.querySelector('td:nth-child(5)').innerText || ''
                }
              }
            } else {
              code = item.querySelector('td:nth-child(2)').innerText || ''
              endPrice = item.querySelector('td:nth-child(5)').innerText == '/' ? '0' : item.querySelector('td:nth-child(5)').innerText
              endPriceTotal = item.querySelector('td:nth-child(6)').innerText == '/' ? '0' : item.querySelector('td:nth-child(6)').innerText
              owner = item.querySelector('td:nth-child(7)').innerText || ''
            }
            detail.push({
              url: location.href,
              code,
              endPrice,
              endPriceTrans: endPrice.indexOf('亩') > -1 ? (endPrice.replace(/[^(\d+\.?\d+)]/ig, '') / 0.0666).toFixed(2) : endPrice.replace(/[^(\d+\.?\d+)]/ig, ''),
              endPriceTotal,
              endPriceTotalTrans: endPriceTotal.replace(/[^(\d+\.?\d+)]/ig, ''),
              owner
            })
          }
        })

        return detail;

      });

      result = result.concat(infos)
      fs.writeFile(`./data/result${m}.json`, JSON.stringify(result), function (res) {})
    }
  }
}

scrape();
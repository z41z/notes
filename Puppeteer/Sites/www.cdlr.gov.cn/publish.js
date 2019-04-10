/**
 * 已发布
 */

const puppeteer = require("puppeteer-core")
const fs = require('fs');
const request = require('request');
const chalk = require('chalk');
let PAGE_NUM = 60;
const URL = 'http://www.cdlr.gov.cn/second/zpgjg.aspx?ClassID=001002002006001';
let result = []

const scrape = async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  })

  const page = await browser.newPage()

  await page.setDefaultNavigationTimeout(120000)
  await page.goto(URL)
  await page.waitFor(3000)
  await page.evaluate((page) => {
    __doPostBack('AspNetPager1', "" + page)
  }, PAGE_NUM);
  await page.waitForNavigation({
    waitUntil: 'networkidle0'
  })
  await page.waitForSelector('#AspNetPager1_input')
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
    console.log(`链接【${chalk.blue(i+1)}】:${chalk.green(subUrls[i])}`)
    let infos = await page.evaluate(() => {
      let detail = [];
      let title = document.querySelector('#gtdetail > div > div.dlefttitle').innerText;
      let date = document.querySelector('#gtdetail > div > div.dleftinfo').innerText.split('|')[0].substring(3).trim();

      let infoEl = document.querySelectorAll('#myFonts table tbody tr');
      if (infoEl.length) {
        infoEl.forEach((item, index) => {
          if (index > 1 && item.querySelector('td:nth-child(2)') && item.querySelector('td:nth-child(3)') && item.querySelector('td:nth-child(4)') && item.querySelector('td:nth-child(5)') && item.querySelector('td:nth-child(6)')) {
            let code = item.querySelector('td:nth-child(2)').innerText || ''
            let address = item.querySelector('td:nth-child(3)').innerText || ''
            let area = item.querySelector('td:nth-child(4)').innerText || ''
            let type = item.querySelector('td:nth-child(5)').innerText || ''
            let startPrice = item.querySelector('td:nth-child(6)').innerText || ''
            detail.push({
              url: location.href,
              title,
              date,
              code,
              address,
              area,
              areaTrans: area.split('\n')[0],
              type,
              startPrice,
              startPriceTrans: startPrice.indexOf('亩') > -1 ? (startPrice.replace(/[^(\d+\.?\d+)]/ig, '') / 0.0666).toFixed(2) : startPrice.replace(/[^(\d+\.?\d+)]/ig, '')
            })
          }
        })
      }

      let imgsEl = document.querySelectorAll('#myFonts > div:nth-child(2) img')
      if (imgsEl.length) {
        imgsEl.forEach((img, index) => {
          if (img && img.src.indexOf('upload') > -1 && detail[index]) {
            detail[index].img = img.src;
          }
        })
      }

      // detail.imgs = imgs;
      return detail;

    });

    if (infos.length) {
      for (let i = 0; i < infos.length; i++) {
        let img = infos[i].img || '';
        infos[i].localImg = '';
        if (img) {
          let imgSplit = img.split('/');
          infos[i].localImg = imgSplit[imgSplit.length - 1];
          await request(img).pipe(fs.createWriteStream(`./images/${imgSplit[imgSplit.length - 1]}`));
        }
      }
      result = result.concat(infos)
      fs.writeFile(`./data/publish${PAGE_NUM}.json`, JSON.stringify(result).replace(/\]\[/ig, ','), function (res) {})
    }
  }
  browser.close();
}
scrape();
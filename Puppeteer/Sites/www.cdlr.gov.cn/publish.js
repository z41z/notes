/**
 * 已发布
 */

const puppeteer = require("puppeteer-core")
const fs = require('fs');
const request = require('request');
let PAGE_TOTAL = 2;
const URL = 'http://www.cdlr.gov.cn/second/zpgjg.aspx?ClassID=001002002006001';

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
      let title = document.querySelector('#gtdetail > div > div.dlefttitle').innerText;
      let date = document.querySelector('#gtdetail > div > div.dleftinfo').innerText.split('|')[0].substring(3).trim();

      document.querySelectorAll('#myFonts > div:nth-child(2) > table > tbody > tr').forEach((item, index) => {
        if (index > 1) {
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
            type,
            startPrice
          })
        }
      })

      document.querySelectorAll('#myFonts > div:nth-child(2) img').forEach((img, index) => {
        if (img && img.src.indexOf('upload') > -1) {
          detail[index].img = img.src;
        }
      })

      // detail.imgs = imgs;
      return detail;

    });

    for (let i = 0; i < infos.length; i++) {
      let img = infos[i].img;
      infos[i].localImg = '';
      if (img) {
        let imgSplit = img.split('/');
        infos[i].localImg = imgSplit[imgSplit.length - 1];
        await request(img).pipe(fs.createWriteStream(`./images/${imgSplit[imgSplit.length - 1]}`));
      }
      fs.appendFile('publish.json', JSON.stringify(infos).replace(/\]\[/ig, ','), function (res) {})
    }
  }

  if (PAGE_TOTAL > 1) {
    PAGE_TOTAL--;
    scrape()
  }
}
const parseData = () => {
  let content = [];
  let codeArr = [];
  fs.readFile('./publish.json', function (err, res) {
    let data = (res.toString().replace(/\]\[/ig, ','))
    JSON.parse(data).forEach(item => {
      if (codeArr.indexOf(item.code) < 0) {
        codeArr.push(item.code)
        content.push(item)
      }
    })
    fs.writeFile('./publish.json', JSON.stringify(content), function (err) {})
  })
}
scrape();
parseData();
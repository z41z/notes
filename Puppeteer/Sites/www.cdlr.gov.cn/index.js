const puppeteer = require("puppeteer")
const fs = require('fs');
const request = require('request');

let result = [];
const scrape = async (url, pageNum) => {
  const browser = await puppeteer.launch({
    headless: false
  })

  const page = await browser.newPage()

  await page.goto(url)
  await page.waitForSelector('#AspNetPager1_input')
  await page.select('#AspNetPager1_input', "" + pageNum);
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
            url: subUrls[i],
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
      fs.appendFile('result.json', JSON.stringify(infos).replace(/\]\[/ig, ','), function (res) { })
    }
  }

  if (pageNum > 1) {
    let nextPage = pageNum--
    scrape('http://www.cdlr.gov.cn/second/zpgjg.aspx?ClassID=001002002006001', nextPage)
  }
}

scrape('http://www.cdlr.gov.cn/second/zpgjg.aspx?ClassID=001002002006001', 2)

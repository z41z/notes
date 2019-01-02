// https://sc.122.gov.cn/publicitypage?size=20&page=17&tjyf=201706&fwdmgl=2033

const puppeteer = require('puppeteer');
var fs = require('fs');
let scrape = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 120000
  });
  const page = await browser.newPage();
  for (let i = 0; i < 352; i++) {
    await page.goto('https://sc.122.gov.cn/publicitypage?size=20&tjyf=201704&fwdmgl=2033&page=' + i);
    await page.waitFor(200)
    let result = await page.evaluate(() => {
      var infos = [];
      document.querySelectorAll('body > div > div:nth-child(3) > table > tbody > tr').forEach(item => {
        var idCard = item.querySelector('td:nth-child(1)').innerText;
        var name = item.querySelector('td:nth-child(2)').innerText;
        infos.push({
          idCard,
          name
        })
      })
      return infos;
    });
    if (result.length) {
      fs.appendFile('result.json', JSON.stringify(result), function (res) {})
    }
  }
};

scrape();

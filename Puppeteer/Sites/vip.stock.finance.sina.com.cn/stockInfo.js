const puppeteer = require('puppeteer');
var fs = require('fs');
var data = [{
  "symbol": "sh600718",
  "code": "600718",
  "name": "东软集团"
}, {
  "symbol": "sh600719",
  "code": "600719",
  "name": "大连热电"
}];
let scrape = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    timeout:120000
  });
  let links = [];
  const page = await browser.newPage();
  for (let i = 0; i < data.length; i++) {
    await page.goto('http://vip.stock.finance.sina.com.cn/corp/go.php/vCI_CorpInfo/stockid/'+data[i].code+'.phtml');
    await page.waitFor(200)
    let result = await page.evaluate(() => {
      return {
        name:document.querySelector('#comInfo1 > tbody > tr:nth-child(1) > td.ccl').innerText||'没有名字',
        url:document.querySelector('#comInfo1 > tbody > tr:nth-child(13) > td:nth-child(4)').innerText||'没有网址',
        type:document.querySelector('#comInfo1 > tbody > tr:nth-child(6) > td:nth-child(4)').innerText||'没有类型',
        description:document.querySelector('#comInfo1 > tbody > tr:nth-child(20) > td.ccl').innerText||'没有描述',
        address:document.querySelector('#comInfo1 > tbody > tr:nth-child(18) > td.ccl').innerText||'没有地址'
      }
    });
    links.push({
      name:result.name,
      url:result.url,
      description:result.description,
      type:result.type,
      code:data[i].code,
      short:data[i].name,
      address:result.address
    });
  }
  return links;
};

scrape().then((value) => {
  fs.writeFile('stockInfo.json', JSON.stringify(value), function (res) {})
});

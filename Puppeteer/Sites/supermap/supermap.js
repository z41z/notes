require('events').EventEmitter.defaultMaxListeners = 0;
let puppeteer = require('puppeteer-core')
let fs = require('fs')
puppeteer.launch({
  headless: false,
  defaultViewport: {
    width: 1920,
    height: 1080
  },
  executablePath: 'C:\\\Program Files (x86)\\\Google\\\Chrome\\\Application\\\chrome.exe'
}).then(async browser => {
  let allUrls = []
  let urls = []
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:8090/iserver/services/data-changchun/rest/data/datasources/Changchun/datasets');
  // 获取catagory类别
  urls = await page.evaluate(() => {
    let url = []
    let urlEl = document.querySelectorAll('#datasetUL > li')
    urlEl.forEach(item => {
      url.push({
        url: item.querySelector('a').href + '/features',
        catagory: item.innerText
      })
    })
    return url
  });

  // 获取catagory子类别
  for (let i = 0; i < urls.length; i++) {
    await page.goto(urls[i].url)
    let subUrls = []
    let catagory = urls[i].catagory
    subUrls = await page.evaluate((catagory) => {
      let subUrl = []
      let subUrlEl = document.querySelectorAll('#featureTable > tbody > tr td:nth-child(1)')
      subUrlEl.forEach((item, index) => {
        if (index > 0) {
          subUrl.push({
            url: item.innerText + '.json',
            catagory
          })
        }
      })
      return subUrl
    }, catagory)
    allUrls = allUrls.concat(subUrls)
  }

  let result = []
  // response数据
  await page.on('response', async (response) => {
    if (response.ok()) {
      let catagory = response.url().split('=')[1]
      let info = await response.json().then(res => {
        let { type = '', center = '', points = '' } = res.geometry || {}
        let fieldNames = res.fieldNames
        let fieldValues = res.fieldValues
        let nameIndex = fieldNames.indexOf('NAME')
        let name = fieldValues[nameIndex] || '无'
        return { name, type, catagory, center: JSON.stringify(center), points: JSON.stringify(points) }
      })
      result.push(info)
    }
  });
  
  // 获取子类别详细数据
  for (let i = 0; i < allUrls.length; i++) {
    await page.goto(allUrls[i].url + `?catagory=${allUrls[i].catagory}`)
  }

  // 将数据写入data.json
  await fs.appendFile('./data.json', JSON.stringify(result), (err) => { })
});
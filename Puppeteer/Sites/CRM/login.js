const pptr = require("puppeteer");
const Mock = require("mockjs");
(async () => {
  const browser = await pptr.launch({
    headless: false
  })
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080
  })
  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle0'
  });
  const username = await page.$('input[name="username"]');
  const password = await page.$('input[name="password"]');
  await username.type('yu.liu', {
    delay: 100
  });
  await password.type('123456', {
    delay: 100
  });
  await password.press('Enter');
  await page.waitFor("#home_menus > li:nth-child(5) > a")
  const crmUrlEl = await page.$("#home_menus > li:nth-child(5) > a");
  await crmUrlEl.click();

  await page.waitFor("#main > div.main-top.col-xs-12.col-sm-12.col-md-12.col-lg-12 > div.col-xs-8.col-sm-8.col-md-8.col-lg-8 > button:nth-child(1)")

  // 添加客户
  const addCustomEl = await page.$("#main > div.main-top.col-xs-12.col-sm-12.col-md-12.col-lg-12 > div.col-xs-8.col-sm-8.col-md-8.col-lg-8 > button:nth-child(1)");
  await addCustomEl.click();
  const frameElement = (await page.frames())[1];
  const form = [{
      name: 'customName'
    },
    {
      name: 'customAbbreviation'
    },
    {
      name: 'employNum',
      type: 'number'
    },
    {
      name: 'annualIncome',
      type: 'number'
    },
    {
      name: 'websiteUrl',
      type: "url"
    },
    {
      name: 'telephone',
      type: "phone"
    }
  ]
  await frameElement.waitFor('[name="customName"]')
  for (let i = 0; i < form.length; i++) {
    let mockType = form[i].type || '';
    let Random = Mock.Random;
    switch (mockType) {
      case 'number':
        await frameElement.type(`[name="${form[i].name}"]`, Random.string("123456789", 1, 9), {
          delay: 100
        })
        break;
      case 'url':
        await frameElement.type(`[name="${form[i].name}"]`, Random.url('http'), {
          delay: 100
        })
        break;
      case 'phone':
        await frameElement.type(`[name="${form[i].name}"]`, `1${Random.character("35478")}${Random.integer(100000000,999999999)}`, {
          delay: 100
        })
        break;
      default:
        await frameElement.type(`[name="${form[i].name}"]`, Random.cname(), {
          delay: 100
        })
        break;
    }
  }

  // 母公司
  const parentNameEl = await frameElement.$("[name='parentName']");
  await parentNameEl.click();
  await page.on(
    'requestfinished', (req) => {
      const url = req.url()
      if (url.indexOf('crm/custom/listbypage') > -1) {
        let res = req.response().json();
        console.log(res)
      }
    }
  )
  const parentNameFrame = (await frameElement.childFrames())[0];
  await parentNameFrame.waitForNavigation({
    waitUntil: 'networkidle0'
  })

})();

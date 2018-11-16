const puppeteer = require('puppeteer');
const fs = require('fs');
const mysql = require('mysql');
const schedule = require('node-schedule');

//数据库连接
 const connection = mysql.createConnection({
   host: MySQLServerAddress,
   user: userName,
   password: password,
   port: port,
   database: database,
 });

var scrape = async (scrape, newsType) => {
  const browser = await puppeteer.launch({
    // headless: false
  })
  const page = await browser.newPage();
  await page.goto(scrape);
  let result = await page.evaluate(() => {
    let url = [];
    let urlsEl = document.querySelectorAll('div.main > ul > li');
    // 存入当天链接
    urlsEl.forEach(item => {
      if (("" + ((new Date).getDate())).padStart(2, 0) == item.querySelector('span').innerText.substring(9, 11)) {
        url.push(item.querySelector('a').href);
      }
    })
    return url
  });

  let results = [];
  // 遍历当天链接
  for (let i = 0; i < result.length; i++) {
    await page.goto(result[i]);
    //获取文章信息
    let addSqlParams = await page.evaluate(() => {
      let info = document.querySelector('body > div.all > div.main');
      let = title = info.querySelector('div.title > div.title1').innerText;
      let content = info.querySelector('body > div.all > div.main > div.nr > div.content').innerHTML.replace(/( class="TRS_Editor")|( align="justify")/g, '');
      // let time = (new Date).toISOString().replace(/T/, ' ').substring(0, 19);
      let time = `${info.querySelector('body > div.all > div.main > div.title > div.time > a:nth-child(1)').innerText.trim()} ${(""+Math.ceil((Math.random())*23)).padStart(2,0)}:${(""+Math.ceil((Math.random())*60)).padStart(2,0)}:${(""+Math.ceil((Math.random())*60)).padStart(2,0)}`
      let tag = '综合';
      let click = 0;
      return [title, content, time, tag, click];
    });
    addSqlParams[3] = newsType;
    // 查找是否已存在
    var serchSQL = 'select COUNT(*) from news where title ="' + addSqlParams[0] + '"';
    //插入
    var addSql = 'INSERT INTO news(title,content,time,tag,click) VALUES(?,?,?,?,?)';
    await connection.query(serchSQL, function (err, res1) {
      if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        return;
      }
      // 不存在则插入数据库
      if (!res1[0]['COUNT(*)']) {
        connection.query(addSql, addSqlParams, function (err, res) {
          if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
          }
          console.log('INSERT ID:', res);
        });
      };
    });
  }
  browser.close();
}

// 定时任务
schedule.scheduleJob('1 1 1 * * *', function () {
scrape('http://www.spb.gov.cn/xw/hqyz_1/ggyzxx/', '国际快递');
scrape('http://www.spb.gov.cn/xw/xydt/', '国内快递');
});

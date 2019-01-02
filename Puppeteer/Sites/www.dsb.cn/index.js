const puppeteer = require('puppeteer');
const mysql = require('mysql');

//数据库连接
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'db_test',
});

var scrape = async (scrape, newsType) => {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage();
  await page.goto(scrape);
  let result = await page.evaluate(() => {
    let url = [];
    let urlsEl = document.querySelectorAll('body > div.new-main.new-mainHeight > div > div.new-left > ul > li');
    // 存入当天链接
    urlsEl.forEach(item => {
      if (("" + ((new Date).getDate())).padStart(2, 0) == item.querySelector('div > em > span').innerText.substring(8, 10)) {
        url.push(item.querySelector('a').href);
      }
    })
    return url
  });

  // 遍历当天链接
  for (let i = 0; i < result.length; i++) {
    await page.goto(result[i]);
    //获取文章信息
    let addSqlParams = await page.evaluate(() => {
      let info = document.querySelector('body > div.new-main.new-mainHeight > div > div.new-content');
      let = title = info.querySelector('h2 > a').innerText;
      let content = info.querySelector('div.new-content-con').innerHTML.replace(/( href="http\:\/\/www\.dsb\.cn.+")|( align="justify")/g, '').trim();
      // let time = (new Date).toISOString().replace(/T/, ' ').substring(0, 19);
      let time = `${info.querySelector('div.new-content-info.clearfix > span:nth-child(3)').innerText.substring(0,10).trim()} ${(""+Math.ceil((Math.random())*23)).padStart(2,0)}:${(""+Math.ceil((Math.random())*60)).padStart(2,0)}:${(""+Math.ceil((Math.random())*60)).padStart(2,0)}`
      let tag = '快递物流';
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

scrape('http://www.dsb.cn/wuliu', '快递物流');

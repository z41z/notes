# 自定义Chrome使用路径
``` node
const browser = await puppeteer.launch({
  headless: false,
  executablePath: YourChromeExePath,
});

```

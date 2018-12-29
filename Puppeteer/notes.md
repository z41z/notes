# 自定义Chrome使用路径
``` node
const browser = await puppeteer.launch({
  headless: false,
  executablePath: YourChromeExePath,
});

```

## Unable to create registry key HKLM\SOFTWARE\Policies\Chromium for reading result=2

- 打开注册表regedit
- 展开HKEY_LOCAL_MACHINE\SOFTWARE\Policies
- 新建项Google\Chromium
- 新建字符串MachineLevelUserCloudPolicyEnrollmentToken

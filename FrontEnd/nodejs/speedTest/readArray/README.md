### Speed Test for read Array

- #### 5,0000

``` js
  let wl = newArrayByWhileLength(5e4)
```

![50w](./5w.png)

- #### 50,0000

``` js
  let wl = newArrayByWhileLength(5e5)
```

![50w](./50w.png)

- #### 500,0000

``` node
  node --max-old-space-size=2048 newArray.js
```

``` js
  let wl = newArrayByWhileLength(5e6)
```

![500w](./500w.png)
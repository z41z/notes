/**
 * 通过高德地图根据地址查询经纬度
 */
let data = [
  {
    "id": "21065",
    "address": "成华区圣灯街办圣灯村8、9组"
  },
  {
    "id": "21066",
    "address": "锦江区成龙路街道华新村2、7组"
  },
  {
    "id": "21067",
    "address": "新都区新都街道蓉都大道"
  }
]
let errorList = []

const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
let keys = [
  '49425b5df5867f5d50b272cc69923ccc',
  'd169ff232ccab96b8fa19e7e25303844',
  '341c6d9e9840212d799314a326a44857',
  '7ad31990285d9ed11f1171e5906bb123',
  'dadfa0897bd9c8cff9cffdf330974b55',
  '9f6c2b09a278eccd06e7a0d01c36131a',
  'dadfa0897bd9c8cff9cffdf330974b55'
]
data.forEach((item, index) => {
  if (errorList.indexOf(+item.id) > -1) {
    axios({
      url: 'http://restapi.amap.com/v3/geocode/geo',
      method: 'get',
      params: {
        address: item.address,
        key: keys[index % keys.length],
        city: '成都'
      },

    }).then(res => {
      let location = res.data.geocodes[0].location.split(',')
      let data = { id: item.id, address: item.address, lng: location[0], lat: location[1] }
      console.log(`序号${index}:${chalk.green(item.id)}`)
      fs.appendFile(`./result-amap${(new Date).toLocaleString().split(' ')[0]}.json`, JSON.stringify(data), function (res) {
      })
    }).catch(err => {
      console.log(`序号${index}:${chalk.red(item.id)}`)
      fs.appendFile(`./error-${(new Date).toLocaleString().split(' ')[0]}.json`, item.id + '\n', function (res) {
      })
    })
  }
})
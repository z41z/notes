const fs = require("fs")
let publish = [];
fs.readdir('./data',(err,file)=>{
  file.forEach(item=>{
    if(item.indexOf('publish')>-1){
      fs.readFile(`./data/${item}`,(err,res)=>{
        publish = publish.concat(JSON.parse(res.toString()))
        fs.writeFile('./publish-all.json',JSON.stringify(publish),function(){})
      })
    }
  })
})
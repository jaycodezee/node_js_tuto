const http = require('http')



const app = http.createServer((res,resp)=>{
    console.log(res.url)
    resp.end("hello")
})


app.listen(3000)
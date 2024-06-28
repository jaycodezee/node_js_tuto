const express = require("express")
// const path = require('path')
const route= express.Router();

const app = express();

const reqFilter= require('./middleware');

// const publicpath = path.join(__dirname,'public')
// console.log(publicpath)

// app.get('',(req,resp)=>{
//         resp.send("hello Form Home")
// })

// app.get('/new.txt',(req,resp)=>{
//         resp.send("hello Form about")
// })


// app.use(express.static(publicpath));


// const reqFilter = (req, resp, next) => {
//     if (!req.query.age) {
//         resp.send("Please provide your age")
//     }
//     else if (req.query.age<18) {
//         resp.send("You are under aged")
//     }else{
//         next();
//     }
// }

// app.use(reqFilter);
route.use(reqFilter)

app.get('/', (res, resp) => {
    resp.send('<h1>Welcome to Home page</h1>')
});

app.get('/users',reqFilter, (res, resp) => {
    resp.send('<h1>Welcome to Users page</h1>')
});

route.get('/about', (res, resp) => {
    resp.send('Welcome to About page')
});

route.get('/contact', (res, resp) => {
    resp.send('Welcome to contact page')
});



app.use('/',route);

app.listen(3000,()=>{
    console.log("listen on this : http://localhost:3000/")
});
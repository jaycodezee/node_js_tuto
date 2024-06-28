var fs = require('fs');
var http = require('http');

const input = process.argv;


if(input[2]=='add'){
    fs.writeFileSync(input[3],input[4]);
    console.log('added')

}else if(input[2]=='remove'){
    fs.unlinkSync(input[3])
    console.log('remoded')

}else if(input[2]=='rename'){
    fs.renameSync(input[3],input[4]);
    console.log('renameed')

}else if(input[2]=='read'){
    http.createServer(function (req, res) {
        fs.readFile(input[3], function(err, data) {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          console.log('read succes on http://localhost:8080/')
          return res.end();
        });
      }).listen(8080);
}else if(input[2]=='update'){
    fs.appendFileSync(input[3],input[4])
    console.log('upadteed')
}


else{

    console.log("error by you")
}


// console.log(process.argv)
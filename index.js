const http = require('http');

var server = http.createServer(function (request, response){
    response.writeHead(200, {'Content-Type':'text/plain'}); //see MIME list for content types
    response.end('This is running from a server');
});

server.listen(3000); //this runs server on port 3000 - when changes are made to this file, server has to be rebooted EXCEPT we installed nodemon
//JK nodemon doesn't work with virtualbox
console.log('the server is running on port 3000');
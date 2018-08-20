// const http = require('http');

// var server = http.createServer(function (request, response){
//     response.writeHead(200, {'Content-Type':'text/plain'}); //see MIME list for content types
//     response.end('This is running from a server');
// });

// server.listen(3000); //this runs server on port 3000 - when changes are made to this file, server has to be rebooted EXCEPT we installed nodemon
// //JK nodemon doesn't work with virtualbox
// console.log('the server is running on port 3000');

const http = require('http');
const fs = require('fs');

var server = http.createServer(function (request, response) {
    var page;
    if (request.url === "/" || request.url === "/home" || request.url === "/index") {
        page = "home";
    } else if (request.url === "/contact") {
        page = "contact";
    } else if (request.url === "/about") {
        page = "about";
    } else {
        page = "404, page not found";
    }
    
    response.writeHead(200, { 'Content-Type': 'text/html' }); //see MIME list for content types
    response.end(`
        <html>
            <head>
                <title>Node Server</title>
            </head>
            <body>
                <h1>${page}</h1>
                <p>${request.url}</p>
                <p>${request.method}</p>
            <body>
        </html>      
    `);
});

server.listen(3000); //this runs server on port 3000 - when changes are made to this file, server has to be rebooted EXCEPT we installed nodemon
//JK nodemon doesn't work with virtualbox
console.log('the server is running on port 3000');
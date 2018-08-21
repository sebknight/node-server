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
const path = require('path');
const data = require('./data/products');
const qs = require('querystring');

var server = http.createServer(function (request, response) {
    console.log(`${request.method} request for ${request.url}`);
    
    if (request.method === 'GET'){
            if (request.url === "/" || request.url === "/home" || request.url === "/index") {
                page = "home";
                fs.readFile('./public/index.html', 'UTF-8', function (error, contents) {
                    if (error) {
                        console.log("Something went wrong");
                    } else {
                        response.writeHead(200, {
                            'Content-Type': 'text/html'
                        });
                        response.end(contents);
                    }
                });
            } else if (request.url === "/contact") {
                page = "contact";
                fs.readFile('./public/contact.html', 'UTF-8', function (error, contents) {
                    if (error) {
                        console.log("Something went wrong");
                    } else {
                        response.writeHead(200, {
                            'Content-Type': 'text/html'
                        });
                        response.end(contents);
                    }
                });
            } else if (request.url === "/about") {
                page = "contact";
                fs.readFile('./public/about.html', 'UTF-8', function (error, contents) {
                    if (error) {
                        console.log("Something went wrong");
                    } else {
                        response.writeHead(200, {
                            'Content-Type': 'text/html'
                        });
                        response.end(contents);
                    }
                });

            } else if (request.url === "/other") {
                page = "other";
                fs.readFile('./public/other.html', 'UTF-8', function (error, contents) {
                    if (error) {
                        console.log("Something went wrong");
                    } else {
                        response.writeHead(200, {
                            'Content-Type': 'text/html'
                        });
                        response.end(contents);
                    }
                });
            } else if (request.url.match(/.js/)) {
                var jsPath = path.join(__dirname, 'public', request.url);
                var fileStream = fs.createReadStream(jsPath, 'UTF-8');
                response.writeHead(200, {
                    'Content-Type': 'text/javascript'
                });
                fileStream.pipe(response);
            } else if (request.url.match(/.css$/)) {
                var cssPath = path.join(__dirname, 'public', request.url);
                var fileStream = fs.createReadStream(cssPath, 'UTF-8');
                response.writeHead(200, {
                    'Content-Type': 'text/css'
                });
                fileStream.pipe(response);
            } else if (request.url.match(/.jpg$/)) {
                var imagePath = path.join(__dirname, 'public', request.url);
                var imageStream = fs.createReadStream(imagePath);
                response.writeHead(200, {
                    'Content-Type': 'image/jpeg'
                });
                imageStream.pipe(response);
            } else if (request.url.match(/.png/)) {
                var imagePath = path.join(__dirname, 'public', request.url);
                var imageStream = fs.createReadStream(imagePath);
                response.writeHead(200, {
                    'Content-Type': 'image/png'
                });
                imageStream.pipe(response);
            } else if (request.url === '/allProducts'){
                response.writeHead(200, {'Content-Type': 'text/json'});
                response.end(JSON.stringify(data));
            } else if (request.url === '/inStock'){
                inStock(response);
            } else if (request.url === '/outOfStock'){
                outOfStock(response);
            }
            else {
                page = "404, page not found";
            }

    // } else if (request.method === 'POST'){
    //     if (request.url === '/formSubmit'){
    //         console.log(request);
    //         response.writeHead(200, {'Content-Type': 'text/plain'});
    //         response.end('Thanks! You sound v cool and interesting.');
    //     }
    // }

     } else if (request.method === 'POST') {
         if (request.url === '/formSubmit') {
            var body = '';
            
            request.on('data', function(data){
                body += data;
            })
            request.on('end', function(){
                var formData = qs.parse(body);
                console.log(formData);
                
            });
     }
    }
    var page;


    });

server.listen(3000); //this runs server on port 3000 - when changes are made to this file, server has to be rebooted EXCEPT we installed nodemon
//JK nodemon doesn't work with virtualbox
console.log('the server is running on port 3000');

function inStock(response){
    var stock = data.filter(function(item){
        return item.inStock === true;
        //this will turn stock into an array
    });
    response.end(JSON.stringify(stock));    
}

function outOfStock(response) {
    var noStock = data.filter(function (item) {
        return item.inStock === true;
        //this will turn stock into an array
    });
    response.end(JSON.stringify(noStock));
}
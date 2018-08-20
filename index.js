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

var server = http.createServer(function (request, response) {
    console.log(`${request.method} request for ${request.url}`);
    
    var page;

    if (request.url === "/" || request.url === "/home" || request.url === "/index") {
            page = "home";
            fs.readFile('./public/index.html', 'UTF-8', function(error, contents){
                if (error){
                    console.log("Something went wrong");
                } else {
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.end(contents);
                }    
            });
        } else if (request.url === "contact") {
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
        } else if (request.url === "about") {
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
            
        } else if (request.url === "other") {
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
        }
        else if (request.url.match(/.css$/)){
            var cssPath = path.join(__dirname, 'public', request.url);
            var fileStream = fs.createReadStream(cssPath, 'UTF-8');
            response.writeHead(200, {'Content-Type': 'text/css'});
            fileStream.pipe(response);
        }
         else if (request.url.match(/.js$/)){
            var jsPath = path.join(__dirname, 'public', request.url);
            var fileStream = fs.createReadStream(jsPath, 'UTF-8');
            response.writeHead(200, {
                'Content-Type': 'text/js'
            });
            fileStream.pipe(response);
            }
        //  else if (request.url.match(/.png$/)) {
        //      var imgPath = path.join(__dirname, 'public', request.url);
        //      var fileStream = fs.createReadStream(imgPath, 'UTF-8');
        //      response.writeHead(200, {
        //          'Content-Type': 'image/png',
        //      });
        //      fileStream.pipe(response);
        //  }
        // else if (request.url.match(/.jpg$/)) {
        //     var imgPath = path.join(__dirname, 'public', request.url);
        //     var fileStream = fs.createReadStream(imgPath, 'UTF-8');
        //     response.writeHead(200, {
        //         'Content-Type': 'image/jpeg',
        //     });
        //     fileStream.pipe(response);
        // }
           else {
               page = "404, page not found";
           }
    });



 
//     response.writeHead(200, { 'Content-Type': 'text/html' }); //see MIME list for content types
//     response.end(`
//         <html>
//             <head>
//                 <title>Node Server</title>
//             </head>
//             <body>
//                 <h1>${page}</h1>
//                 <p>${request.url}</p>
//                 <p>${request.method}</p>
//             <body>
//         </html>      
//     `);
// });

server.listen(3000); //this runs server on port 3000 - when changes are made to this file, server has to be rebooted EXCEPT we installed nodemon
//JK nodemon doesn't work with virtualbox
console.log('the server is running on port 3000');
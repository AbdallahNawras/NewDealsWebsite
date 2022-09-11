/*
 * Write your server code in this file.  Don't forget to add your name and
 * @oregonstate.edu email address below.
 *
 * name: Abdallah Nawras
 * email:nawrasa@oregonstate.edu
 */

 var indexFile = null;
 var indexJs = null;
 var img = null;
 var style = null;
 var http = require('http'), fs = require('fs');

 var server = http.createServer(requestHandler);

 fs.readFile("./public/index.html", "utf-8", function(err,data){
     if (err) {throw err; }
         indexFile = data;
         console.log("[file successfully read: index.html]");
 });

 fs.readFile("./public/index.js", "utf-8", function(err, data) {
     if(err) {throw err; }
     indexJs = data;
     console.log("[file successfully read: index.js]");
 });

 fs.readFile("./public/404.html", "utf-8", function(err, data ) {
     if (err) { throw err; }
     page_404_html = data;
     console.log("[file successfully read: 404.html]");
 });

 fs.readFile("./public/style.css", "utf-8", function(err, data) {
     if (err) { throw err; }
     style = data;
     console.log("[file successfully read: style.css]");
 });

 fs.readFile("./public/benny.jpg", function(err,data) {
     if(err) { throw err; }
     img = data;
     console.log("[file successfully read: benny.jpg]");
 });

server.listen(3000, function(err) {
    if (err) {throw err; }
    console.log("[Server is listening on port 3000]");
});


function requestHandler(req, res) {
    console.log("[Request received]");

    switch(req.url) {
        case "/":
            res.write(indexFile);
            break;
        case "/index.html":
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(indexFile);
            break;
        
        case "/style.css":
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(style);
            break;

        case "/index.js":
            res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.write(indexJs);
            break;

        case "/benny.jpg":
            res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.write(img);
            break;
        
        default:
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write(page_404_html);
    }
    res.end();
}
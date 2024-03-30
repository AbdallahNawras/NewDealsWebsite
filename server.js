var http = require('http'), fs = require('fs'), path = require('path');

var server = http.createServer(requestHandler);

server.listen(3000, function(err) {
    if (err) { throw err; }
    console.log("[Server is listening on port 3000]");
});

function requestHandler(req, res) {
    console.log("[Request received for " + req.url + "]");

    var filePath = '.' + req.url;
    if (filePath == './') {
        filePath = './public/index.html';
    } else {
        // If the request is for a file, serve it from the public directory
        filePath = './public' + req.url;
    }

    // Extract the file extension and set the content type accordingly
    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif'
        // Add other MIME types as needed
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile('./public/404.html', function(error, content) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('Sorry, there was an error: ' + error.code + ' ..\n');
                res.end();
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');

const comments = [];

http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    if (pathname === '/comment') {
        if (req.method === 'POST') {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            });
            req.on('end', () => {
                const comment = JSON.parse(data);
                comment.time = new Date();
                comments.push(comment);
                res.end(JSON.stringify(comment));
            });
        } else {
            res.end(JSON.stringify(comments));
        }
    } else {
        fs.createReadStream(`./public${pathname}`).pipe(res);
    }
}).listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
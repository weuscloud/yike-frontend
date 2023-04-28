const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // 读取文件并发送响应
  fs.readFile('./dist.zip', (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=dist.zip');
    res.writeHead(200);
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});


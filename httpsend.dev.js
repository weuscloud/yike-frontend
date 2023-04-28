const http = require('http');
const fs = require('fs');

// 读取文件并发送请求
const fileStream = fs.createReadStream('./dist.zip');
const req = http.request({
  method: 'POST',
  hostname: '18.201.208.25:3000',
  path: '/upload',
  headers: {
    'Content-Type': 'application/zip',
    'Content-Disposition': 'attachment; filename=dist.zip',
  },
}, (res) => {
  res.on('data', (chunk) => {
    console.log(`Response received: ${chunk}`);
  });
  res.on('end', () => {
    console.log('Request finished');
  });
});
fileStream.pipe(req);

// 处理错误
req.on('error', (e) => {
  console.error(`Request error: ${e}`);
});

// 结束请求
req.end();


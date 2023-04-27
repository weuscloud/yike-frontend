const AdmZip = require('adm-zip');
const zipFilePath = './dist.zip'; // 压缩包文件路径
const nginxHtmlDir = '/usr/share/nginx/html'; // Nginx默认HTML目录

function zipDirectory(directoryPath, zipFilePath, callback) {
    const zip = new AdmZip();
    zip.addLocalFolder(directoryPath);
    zip.writeZip(zipFilePath, callback);
  }


function extractZip() {
  // 创建一个解压缩对象
  const zip = new AdmZip(zipFilePath);

  // 解压缩所有文件到Nginx默认HTML目录
  zip.extractAllTo(nginxHtmlDir, true);

  // 获取所有解压缩的文件条目
  const zipEntries = zip.getEntries();

  // 打印解压缩的文件名和大小
  zipEntries.forEach(entry => {
    console.log(`Unzipped ${entry.entryName} (${entry.header.size} bytes)`);
  });
  console.log(`Unzipping completed to ${nginxHtmlDir}`);
}
zipDirectory('./dist','./dist.zip',()=>{
    extractZip();
})

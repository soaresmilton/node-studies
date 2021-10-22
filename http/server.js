const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3000;
const server = http.createServer((req, res) => {
  const file = req.url === '/' ? 'index.html' : req.url;
  const filePath = path.join(__dirname, 'public', file);

  const extname = path.extname(filePath);
  const allowedFileTypes = ['.html', '.css', '.js'];
  const allowed = allowedFileTypes.find(item => item == extname);
  if(!allowed) return;

  fs.readFile(
        filePath,
        (err, content) => {
          if(err) throw err;
  
          res.end(content);
        }
      )

});


server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT ===> http://localhost:${PORT}`);
})
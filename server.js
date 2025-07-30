/* Simple static file server using Node.js (modern syntax)
This file starts a simple file server from the root. 
Start this server with node app.js
This was made to simplify web development, there is no need to use it
*/

import * as http from 'node:http';
import * as fs from 'node:fs';
import * as path from 'node:path';

const PORT = 8000;
const STATIC_PATH = path.join(process.cwd(), './nutriquest-webapp'); // serve ./nutriquest-webapp directory

http.createServer(async (req, res) => {
  let filePath = path.join(STATIC_PATH, req.url.endsWith('/') ? req.url + 'index.html' : req.url);
  if (!filePath.startsWith(STATIC_PATH)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.createReadStream(filePath)
    .on('error', () => {
      res.writeHead(404);
      res.end('Not found');
    })
    .pipe(res);
}).listen(PORT);

console.log(`Serving files at http://localhost:${PORT}/`);
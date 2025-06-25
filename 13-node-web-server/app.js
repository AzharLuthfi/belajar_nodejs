// import http from 'http';
const http = require("http");
const fs = require("fs");
const port = 3000;

// fungsi baca file
function bacaFile(path, res) {
  fs.readFile(path, (e, data) => {
    if (e) {
      res.writeHead(404);
      res.write("file tidak ditemukan!");
    } else {
      res.write(data);
    }
    res.end();
  });
}

// Create a server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });

  const url = req.url;

  switch (url) {
    case "/about":
      bacaFile("./about.html", res);
      break;
    case "/contact":
      bacaFile("./contact.html", res);
      break;
    default:
      bacaFile("./index.html", res);
      break;
  }

  //   if (url === "/about") {
  //     bacaFile("./about.html", res);
  //   } else if (url === "/contact") {
  //     bacaFile("./contact.html", res);
  //   } else {
  //     bacaFile("./index.html", res);
  //   }
});

// Listen on a port
server.listen(port, () => {
  // param 1 untuk port, param 2 untuk host kalo ga diisi defaultnya localhost, param 3 untuk callback ketika server sudah siap
  console.log(`Server running on port ${port}...`);
});

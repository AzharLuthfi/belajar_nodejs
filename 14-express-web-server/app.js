const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});
// coba variabel req (request) dan res (response)
app.get("/product/:id/category/:ctg_id", (req, res) => {
  const id = req.params.id; // apa yang dikirimkan ke url
  const ctg_id = req.params.ctg_id;
  res.send(`Product ID: ${id} <br> Category ID: ${ctg_id}`); // apa yang dikirimkan ke client (halaman)
});

// cobain req.query() --> mengambil data query string (data setelah ?)
// Jika kamu buka http://localhost:3000/search?keyword=kopi&kategori=minuman, maka server akan membalas:
// Pencarian untuk: kopi, kategori: minuman
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const kategori = req.query.kategori;

  res.send(`Pencarian untuk: ${keyword}, kategori: ${kategori}`);
});

app.use("/", (req, res) => {
  // this is the catch all route
  res.sendFile(path.join(__dirname, "public", "404.html"));
  res.status(404);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// contact App
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin, // ini adalah input dari user
  output: process.stdout, // ini untuk menampilkan output
});

// membuat folder data jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf8");
}

const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (jawabanUsr) => {
      resolve(jawabanUsr);
    });
  });
};

// fungsi simpan contact
const simpanContact = (nama, email, noTelp) => {
  const datacontact = { nama, email, noTelp };
  if (fs.existsSync("data/contacts.json")) {
    try {
      // 1. ceks direktori tujuan ada enggak
      const data = fs.readFileSync("data/contacts.json", "utf-8"); // 2. baca data dari directory
      const contacts = JSON.parse(data); // 3. rubah data string yg dibaca dari direktory jadi json
      contacts.push(datacontact); // 4. push data contact ke array contacts
      fs.writeFileSync("data/contacts.json", JSON.stringify(contacts), "utf-8"); // 5. tuliskan data baru dari variable contacts ke dalam file tujuan
      console.log("data telah ditambahkan!");
    } catch (error) {
      console.log("data tidak bisa ditambahkan");
    }
  } else {
    console.log("direktori tidak ditemukan");
  }
  rl.close(); // pake close karena kita sudah menyelesaikan pertanyaan
};

module.exports = { tulisPertanyaan, simpanContact };

// Core Module
// 1. File System

// const fs = require("fs"); // file system module ga pake ./ pada path require nya

// menuliskan string ke file (synchronous)
// fs.writeFileSync("test.txt", "Hello, ini pake synchronous"); // menulis string ke file test.txt jika ada dan menimpah isinya
// jika test.txt gaada maka akan di buatkan test.txtnya otomatis

// try {
//   fs.writeFileSync("data/test.txt", "Hello, ini pake synchronous"); // menulis string ke file test.txt jika ada dan menimpah isinya
// } catch (error) {
//   console.log(error);
// }
// jika kita tulis nama folder di cari dulu foldernya, kalo gaada ga-akan di eksekusi
// karena node punya fungsi tersendiri untuk membuat folder

// menuliskan string ke file (asynchronous)
// fs.writeFile("data/test.txt", "Hello ini dibuat pake asyncchronous!", (e) => {
//   return e ? console.log(e) : console.log("berhasil menulis file");
// });

// membaca isi file (synchronous)
// const data = fs.readFileSync("data/test.txt", "utf-8");
// console.log(data);

// membaca isi file (asynchronous)
// const data = fs.readFile("data/test.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// console.log(data);

// readline module
// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin, // ini adalah input dari user
//   output: process.stdout, // ini untuk menampilkan output
// });
// rl.question("siapa nama kamu? ", (nama) => {
//   // ini adalah pertanyaan yang akan ditampilkan kepada user
//   rl.question("berapa umur kamu? ", (umur) => {
//     console.log(`hai ${nama} kamu ${umur} tahun`);
//     rl.close(); // pake close karena kita sudah menyelesaikan pertanyaan
//   });
// });

// chalenge pertanyaan hasilnya di simpan di file contacts.json
const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin, // ini adalah input dari user
  output: process.stdout, // ini untuk menampilkan output
});
rl.question("siapa nama kamu? ", (nama) => {
  // ini adalah pertanyaan yang akan ditampilkan kepada user
  rl.question("berapa umur kamu? ", (umur) => {
    const datacontact = { nama, umur };
    if (fs.existsSync("data/contacts.json")) {
      try {
        // 1. ceks direktori tujuan ada enggak
        const data = fs.readFileSync("data/contacts.json", "utf-8"); // 2. baca data dari directory
        const contacts = JSON.parse(data); // 3. rubah data string yg dibaca dari direktory jadi json
        contacts.push(datacontact); // 4. push data contact ke array contacts
        fs.writeFileSync(
          "data/contacts.json",
          JSON.stringify(contacts),
          "utf-8"
        ); // 5. tuliskan data baru dari variable contacts ke dalam file tujuan
        console.log("data telah ditambahkan!");
      } catch (error) {
        console.log("data tidak bisa ditambahkan");
      }
    } else {
      console.log("direktori tidak ditemukan");
    }
    rl.close(); // pake close karena kita sudah menyelesaikan pertanyaan
  });
});

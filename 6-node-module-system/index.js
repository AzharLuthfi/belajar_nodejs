// 3 jenis module:
//  1. Core Module --> module inti bawaan node js
//  2. local module --> module yg kita definisikan sendiri
//  3. thrid party module --> module dari pihak ke 3 (npm module)
// const fs = require("fs"); // --> contoh core module untuk "file sistem"
// const cetakNama = require("./coba.js"); // --> local module
// const moment = require("moment"); // --> ini contoh module thrid party (npm module) --> disimpan di file node_modules

const coba = require("./coba.js"); // --> cukup sekali module yang di panggil --> ini mengembalikan object export yg kita buat di coba.js
console.log(
  coba.cetak("Azhar"),
  `|`,
  coba.PI,
  `|`,
  coba.mahasiswa.sayHello(),
  `|`,
  new coba.Orang()
); // --> ini cara panggilnya kaya manggil property object di js biasa

// console.log("Hello, Azhar!"); // Output: Hello, Azhar!
// ini adalah index jadi manggil di terminalnya bisa pake node .
// dan file ini akan oromatis default tereksekusi

// kita bisa buat variabel dan function disini sama seperti file js biasa
// const nama = "A zhar";
// const umur = 20;
// const cetakNama = (nama, umur) =>
//   `Hallo, nama saya ${nama} dan umur saya ${umur}`;
// console.log(cetakNama(nama, umur)); // Output: Hallo, nama saya

// console.log(window); // ini gaakan jalan karena node lingkupnya sudah bukan di browser lagi
// require("./coba.js"); // ini akan mengimport file coba.js dan menjalankannya
const cetakNama = require("./coba.js"); // ini samakan dengan nama apa yang ingin kita kirim

cetakNama("Azhar"); // ini gaakan jalan seperti saat di browser, output: cetakNama is not defined
// ini kkarena node menganggap setiap file js sebagai satu module
// fungsi di module satu tidak bisa begitu aja diakses oleh module lain

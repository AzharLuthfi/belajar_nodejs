// console.log("hello world!"); // cara eksekusi di node
// 1. buka terminal
// 2. ketikkan node namaFile -> boleh pake ekstensi .js atau tidak
// 3. enter
// 4. maka akan muncul output "hello world!" di terminal

function cetakNama(nama) {
  console.log(`Hallo, ${nama}`);
}

// cetakNama("Azhar"); // kalo disimpen di module yang sama lalu di panggil di module lain gini bisa dieksekusi  di tempat kita require();

// supaya fungsi cetakNama bisa dieksekusi atau di panggil di luar module lakukan ini
module.exports = cetakNama;

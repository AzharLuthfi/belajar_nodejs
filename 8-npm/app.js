// const validator = require("validator"); // Import the validator module
const chalk = require("chalk"); // Import the chalk module

// cek string ini adalah email
// const isEmail = validator.isEmail("Azhar@gmail.com"); //=> true
// console.log(isEmail);

// cek apakah string adalah nomor telepon,
// const isMobilePhone = validator.isMobilePhone("081809964547", "id-ID"); //=> true
// console.log(isMobilePhone);

// cek apakah string adalah angka
// const isNumeric = validator.isNumeric("12321361");
// console.log(isNumeric); //=> true

// pake chalk untuk ngebuat terminal lenih berwarna
// console.log(
//   chalk.green(
//     "I am a green line " +
//       chalk.blue.underline.bold("with a blue substring") +
//       " that becomes green again!"
//   )
// );

// Use RGB colors in terminal emulators that support it.
// console.log(chalk.rgb(123, 45, 67).underline("Underlined reddish color"));
// console.log(chalk.hex("#DEADED").bold("Bold gray!"));

// pake tamplate literal
const pesan = chalk`saya adalah {bgBlue azhar} umur saya {green 20} tahun`;
console.log(pesan);

const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017";

// Database Name
const dbName = "coba_mongo";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    return console.log("Error connecting to MongoDB", error);
  }

  // pilih database
  const db = client.db(dbName);

  // menambahkan 1 dan lebih data ke collection mahasiswa
  const mahasiswaCollection = db.collection("mahasiswa");
  //   const data = [
  //     {
  //       nama: "Rizky Khapidsyah",
  //       email: "rizky@mail.com",
  //     },
  //     {
  //       nama: "Faris",
  //       email: "Faris@mail.com",
  //     },
  //   ];

  // PROSES TAMBAH SATU DATA
  //   mahasiswaCollection.insertOne(data, (error, result) => {
  //     if (error) {
  //       return console.log("Error inserting data", error);
  //     }
  //     console.log("Data inserted successfully", result);
  //     client.close();
  //   });

  // PROSES TAMBAH BEBERAPA DATA
  //   mahasiswaCollection.insertMany(data, (error, result) => {
  //     if (error) {
  //       return console.log("Error inserting data", error);
  //     }
  //     console.log("Data inserted successfully", result);
  //     client.close();
  //   });

  // PROSES MEMBACA DATA
  //   mahasiswaCollection.find().toArray((error, result) => {
  //     if (error) {
  //       return console.log("Error reading data", error);
  //     }
  //     console.log("Data read successfully", result);
  //     client.close();
  //   });

  // PROSES MEMBACA DATA DENGAN FILTER
  //   mahasiswaCollection
  //     .find({ _id: ObjectId("68650509adeccb7857748a60") }) // jangan lupa import ObjectId
  //     .toArray((error, result) => {
  //       if (error) {
  //         return console.log("Error reading data", error);
  //       }
  //       console.log("Data read successfully", result);
  //       client.close();
  //     });

  // PROSES UPDATE DATA
  //   mahasiswaCollection.updateOne(
  //     { _id: ObjectId("68652409f5e3f942d005fb46") }, // filter dokumen
  //     { $set: { nama: "sayuki", email: "sayu@mail.com" } }, // data yang ingin diubah (bisa ubah 1 property saja misal email saja)
  //     (error, result) => {
  //       if (error) {
  //         return console.log("Gagal update:", error);
  //       }
  //       console.log("Berhasil update:", result.result);
  //       client.close();
  //     }
  //   );

  // PROSES RUBAH LENIH DARI 1 DATA
  //   mahasiswaCollection.updateMany(
  //     { jurusan: "Teknik" }, // filter dokumen yang akan diubah
  //     { $set: { jurusan: "Teknik Informatika" } }, // perubahan data
  //     (error, result) => {
  //       if (error) {
  //         return console.log("Gagal update banyak data:", error);
  //       }
  //       console.log("Jumlah data yang diubah:", result.modifiedCount);
  //       client.close();
  //     }
  //   );

  // PROSES HAPUS DATA
  //   mahasiswaCollection.deleteOne(
  //     { _id: ObjectId("68652409f5e3f942d005fb47") },
  //     (error, result) => {
  //       if (error) {
  //         return console.log("Gagal hapus data:", error);
  //       }
  //       console.log("Data berhasil dihapus:", result);
  //       client.close();
  //     }
  //   );

  // PROSES HAPUS BANYAK DATA
  //   mahasiswaCollection.deleteMany({ jurusan: "Teknik" }, (error, result) => {
  //     if (error) {
  //       return console.log("Gagal hapus banyak data:", error);
  //     }
  //     console.log("Jumlah data yang dihapus:", result.deletedCount);
  //     client.close();
  //   });
});

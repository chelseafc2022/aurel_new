const multer = require('multer');
const path = require('path');

// Konfigurasi disk storage untuk multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Direktori tujuan penyimpanan file
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Mendapatkan ekstensi file
    cb(null, `${Date.now()}${ext}`); // Menambahkan timestamp pada nama file
  },
});

// Filter file untuk memvalidasi jenis file yang diizinkan
const fileFilter = function (req, file, cb) {
  const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Jika tipe file diizinkan
  } else {
    console.log('File tidak valid:', file.originalname); // Log jika file tidak valid
    cb(new Error('Only .png, .jpg, .jpeg, and .pdf formats are allowed!'), false); // Menolak file
  }
};

// Inisialisasi multer tanpa batasan ukuran file
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  // Hapus batasan ukuran file dengan menghilangkan properti `limits`
});

module.exports = upload;
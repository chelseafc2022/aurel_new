const express = require('express');
var db = require('../../../db/MySql/umum');
const router = express.Router();

const fs = require('fs');

var multer=require("multer");
var upload = require('../../../db/multer/pdf');

var uniqid = require('uniqid');




router.get('/list', (req, res) => {
    // console.log(req.body)
    let view = ` 
        SELECT 
        master_pj.*
        FROM master_pj 
    `;
    db.query(view, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(row)
        }
    })
});
// Perbaikan pada rek_koran.js
router.post('/view', (req, res) => {
    var data_batas = parseInt(req.body.page_limit) || 10;
    var data_star = (parseInt(req.body.data_ke) - 1) * data_batas;
    var cari = req.body.cari_value || "";
    
    // Gunakan logika filter dari kode referensi Anda
    var unit_filter = '';
    if (req.body.unit_kerja && req.body.unit_kerja !== '') {
        // Sesuaikan nama kolom, apakah 'unit_kerja' atau 'unit_kerja_id'
        unit_filter = ` AND rek_koran.unit_kerja = '${req.body.unit_kerja}' `;
    }

    var tahun_filter = '';
    if (req.body.tahun) {
        tahun_filter = ` AND rek_koran.tahun = '${req.body.tahun}' `;
    }

    // Query untuk hitung total (jml_data)
    let jml_data_query = `
        SELECT rek_koran.id
        FROM rek_koran
        LEFT JOIN simpeg.unit_kerja uk ON rek_koran.unit_kerja = uk.id
        WHERE (rek_koran.nama_file LIKE '%${cari}%' OR rek_koran.keterangan LIKE '%${cari}%')
        ${unit_filter}
        ${tahun_filter}
    `;

    // Query untuk ambil data (view)
    let view_query = `
        SELECT rek_koran.*, uk.unit_kerja as unit_kerja_uraian
        FROM rek_koran
        LEFT JOIN simpeg.unit_kerja uk ON rek_koran.unit_kerja = uk.id
        WHERE (rek_koran.nama_file LIKE '%${cari}%' OR rek_koran.keterangan LIKE '%${cari}%')
        ${unit_filter}
        ${tahun_filter}
        ORDER BY rek_koran.createAt DESC
        LIMIT ${data_star}, ${data_batas}
    `;

    db.query(jml_data_query, (err, rows) => {
        if (err) return res.status(500).json(err);
        
        let total_halaman = Math.ceil(rows.length / data_batas) || 1;

        db.query(view_query, (err2, result) => {
            if (err2) return res.status(500).json(err2);
            
            res.json({
                data: result,
                jml_data: total_halaman
            });
        });
    });
});

router.post('/addData', upload.single("file"), (req, res) => {

    var form = JSON.parse(req.body.form);
    var file = req.file;

    let insert = `
        INSERT INTO rek_koran
        (
            id,
            unit_kerja,
            tahun,
            nama_file,
            keterangan,
            file,
            file_type,
            createAt,
            createBy
        )
        VALUES
        (
            '`+uniqid()+`',
            '`+form.unit_kerja+`',
            `+form.tahun+`,
            '`+form.nama_file+`',
            '`+form.keterangan+`',
            '`+file.filename+`',
            '`+file.mimetype+`',
            NOW(),
            '`+req.user._id+`'
        )
    `;

    db.query(insert, (err, row) => {
        if (err) {
            console.log('ERROR ADD rek_koran');
            console.log(err);
            res.send(err);
        } else {
            res.send(row);
        }
    });

});

router.post('/editData', upload.single("file"), (req, res) => {
    var form = JSON.parse(req.body.form);
    var file = req.file;
    
    let nama_file_db = form.file_old; // Default pakai file lama
    let type_file_db = ""; // Anda mungkin perlu query dulu jika ingin mempertahankan type lama
    
    let update_file_query = "";

    // Jika ada file baru yang diupload
    if (file) {
        nama_file_db = file.filename;
        type_file_db = file.mimetype;
        update_file_query = `, file = '${nama_file_db}', file_type = '${type_file_db}'`;

        // Hapus file fisik lama dari folder uploads agar tidak penuh
        if (form.file_old) {
            fs.unlink('./public/uploads/' + form.file_old, (err) => {
                if (err) console.log("Gagal hapus file lama:", err);
            });
        }
    }

    let update = `
        UPDATE rek_koran SET
            tahun = ${form.tahun},
            nama_file = '${form.nama_file}',
            keterangan = '${form.keterangan}'
            ${update_file_query}
        WHERE id = '${form.id}'
    `;

    db.query(update, (err, row) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.json(row);
        }
    });
});
router.post('/hapusData', (req, res) => {
    let { id, file } = req.body;

    // 1. Query Hapus dari Database
    let del_query = `DELETE FROM rek_koran WHERE id = '${id}'`;

    db.query(del_query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            // 2. Jika DB berhasil dihapus, hapus juga file fisiknya jika ada
            if (file && file !== '') {
                const pathFile = './public/uploads/' + file;
                fs.unlink(pathFile, (err_fs) => {
                    if (err_fs) {
                        console.log("Catatan: File fisik gagal dihapus/tidak ditemukan.");
                    } else {
                        console.log("File fisik berhasil dihapus:", file);
                    }
                });
            }
            res.json(result);
        }
    });
});









module.exports = router;
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

router.post('/view', (req, res) => {
    var data_batas = parseInt(req.body.page_limit) || 10;
    var data_star = (parseInt(req.body.data_ke) - 1) * data_batas;
    var cari = req.body.cari_value || "";

    var register_filter = '';
    if (req.body.jenis_register && req.body.jenis_register !== '') {
        register_filter = ` AND register.jenis_register = '${req.body.jenis_register}' `;
    }
    
    var unit_filter = '';
    if (req.body.unit_kerja && req.body.unit_kerja !== '') {
        unit_filter = ` AND register.unit_kerja = '${req.body.unit_kerja}' `;
    }

    var tahun_filter = '';
    if (req.body.tahun) {
        tahun_filter = ` AND register.tahun = '${req.body.tahun}' `;
    }

    let jml_data_query = `
        SELECT register.id
        FROM register
        LEFT JOIN simpeg.unit_kerja uk ON register.unit_kerja = uk.id
        WHERE (register.nama_file LIKE '%${cari}%' OR register.keterangan LIKE '%${cari}%')
        ${unit_filter}
        ${tahun_filter}
        ${register_filter}
    `;

    let view_query = `
        SELECT register.*, uk.unit_kerja as unit_kerja_uraian
        FROM register
        LEFT JOIN simpeg.unit_kerja uk ON register.unit_kerja = uk.id
        WHERE (register.nama_file LIKE '%${cari}%' OR register.keterangan LIKE '%${cari}%')
        ${unit_filter}
        ${tahun_filter}
        ${register_filter}
        ORDER BY register.createAt DESC
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
        INSERT INTO register
        (
            id,
            unit_kerja,
            tahun,
            nama_file,
            keterangan,
            file,
            file_type,
            jenis_register,
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
            '`+form.jenis_register+`',
            NOW(),
            '`+req.user._id+`'
        )
    `;

    db.query(insert, (err, row) => {
        if (err) {
            console.log('ERROR ADD register');
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
    
    let nama_file_db = form.file_old;
    let type_file_db = ""; 
    
    let update_file_query = "";

    if (file) {
        nama_file_db = file.filename;
        type_file_db = file.mimetype;
        update_file_query = `, file = '${nama_file_db}', file_type = '${type_file_db}'`;

     
        if (form.file_old) {
            fs.unlink('./public/uploads/' + form.file_old, (err) => {
                if (err) console.log("Gagal hapus file lama:", err);
            });
        }
    }

    let update = `
        UPDATE register SET
            tahun = ${form.tahun},
            nama_file = '${form.nama_file}',
            keterangan = '${form.keterangan}',
            jenis_register = '${form.jenis_register}'
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

    let del_query = `DELETE FROM register WHERE id = '${id}'`;

    db.query(del_query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
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
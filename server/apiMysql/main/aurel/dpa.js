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


router.post('/addData', upload.single("file"), (req, res) => {

    var form = JSON.parse(req.body.form);
    var file = req.file;

    let insert = `
        INSERT INTO dpa
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
            console.log('ERROR ADD DPA');
            console.log(err);
            res.send(err);
        } else {
            res.send(row);
        }
    });

});










module.exports = router;
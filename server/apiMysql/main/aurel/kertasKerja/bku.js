const express = require('express');
var db = require('../../../../db/MySql/trista_monev');

const fs = require('fs');

var multer=require("multer");
var upload = require('../../../../db/multer/pdf');

var uniqid = require('uniqid');
const { log } = require('console');
const router = express.Router();





router.post('/view', (req, res) => {
    
    console.log(req.body);

    var unit = '' 
    if (req.body.tipe==17 || req.body.unit_kerja == '' || req.body.unit_kerja == null || req.body.unit_kerja == undefined ) {
        unit = ``
    } else {
        unit = ` AND realisasi_keuangan.unit_kerja = '`+req.body.unit_kerja+`'`
    }


    var query = `
        SELECT 
        
        realisasi_keuangan.*,
        (
            SELECT SUM(realisasi)
            FROM monev_pembangunan.realisasi_keuangan_serapan realisasi_keuangan_serapan
            WHERE realisasi_keuangan.id = realisasi_keuangan_serapan.realisasi_keuangan_id
        
        ) as jml_keluar,
        (
            SELECT SUM(nilai)
            FROM monev_pembangunan.kk kk

            JOIN monev_pembangunan.realisasi_fisik realisasi_fisik
            ON realisasi_fisik.id = kk.realisasi_fisik_id

            JOIN monev_pembangunan.realisasi_keuangan_serapan realisasi_keuangan_serapan
            ON realisasi_keuangan_serapan.id = realisasi_fisik.realisasi_keuangan_serapan_id


            WHERE realisasi_keuangan_serapan.realisasi_keuangan_id = realisasi_keuangan.id

        
        ) as jml_lpj





        FROM monev_pembangunan.realisasi_keuangan realisasi_keuangan

        WHERE realisasi_keuangan.unit_kerja = '`+req.body.unit_kerja+`'
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });



});



router.post('/removeData', (req, res)=> {
   
    var query = `
        DELETE FROM bku WHERE id = '`+req.body.id+`';
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})


// =====================================================================================//














module.exports = router;
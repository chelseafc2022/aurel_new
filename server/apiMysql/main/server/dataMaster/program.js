const express = require('express');
var db = require('../../../../db/MySql/umum');
const router = express.Router();


router.post('/list', (req, res) => {
    console.log(req.body)

    var filter_urusan = ''
    if (req.body.urusan_kode == null || req.body.urusan_kode == undefined || req.body.urusan_kode == '') {
        filter_urusan = ''
    }else{

        if (req.body.urusan_bidang_kode == null || req.body.urusan_bidang_kode == undefined || req.body.urusan_bidang_kode == '') {
            filter_urusan = `master_program.urusan_kode = '`+req.body.urusan_kode+`'`
        } else {
            filter_urusan = `
            (
                    master_program.urusan_kode = '`+req.body.urusan_kode+`'
                    AND master_program.urusan_bidang_kode = '`+req.body.urusan_bidang_kode+`'
                )
            
            `
        }


    }


    let view = ` 
        SELECT 
        master_program.*,
        urusan_bidang.uraian as urusan_bidang_uraian,
        urusan_bidang.kode_full as urusan_bidang_kode,
        urusan.uraian as urusan_uraian,
        urusan.kode as urusan_kode

        FROM master_program

        LEFT JOIN urusan_bidang
        ON urusan_bidang.kode_full = master_program.urusan_bidang_kode

        LEFT JOIN urusan
        ON urusan.kode_full = urusan_bidang.urusan_kode

        WHERE 
        `+filter_urusan+`
    `;
    db.query(view, (err, row)=>{
        if (err) {
            console.log(err);
            res.json(err)
        }else{
            res.json(row)
        }
    })
});

router.post('/view', (req, res) => {
    var data_batas = parseInt(req.body.page_limit);
    var data_star = (req.body.data_ke - 1) * data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    console.log(req.body);


    var filter_urusan = ''
    if (req.body.urusan_kode == null || req.body.urusan_kode == undefined || req.body.urusan_kode == '') {
        filter_urusan = ''
    }else{

        if (req.body.urusan_bidang_kode == null || req.body.urusan_bidang_kode == undefined || req.body.urusan_bidang_kode == '') {
            filter_urusan = `AND master_program.urusan_kode = '`+req.body.urusan_kode+`'`
        } else {
            filter_urusan = `
            AND (
                    master_program.urusan_kode = '`+req.body.urusan_kode+`'
                    AND master_program.urusan_bidang_kode = '`+req.body.urusan_bidang_kode+`'
                )
            
            `
        }


    }

    let jml_data = ` 
    SELECT 
    master_program.id

    FROM master_program

    LEFT JOIN urusan_bidang
    ON urusan_bidang.kode_full = master_program.urusan_bidang_kode

    WHERE master_program.uraian LIKE '%`+cari+`%'
    `+filter_urusan+`
        
    `;

    let view = `
        SELECT 
        master_program.*,
        urusan_bidang.uraian as urusan_bidang_uraian,
        urusan_bidang.kode_full as urusan_bidang_kode,
        urusan.uraian as urusan_uraian,
        urusan.kode as urusan_kode

        FROM master_program

        LEFT JOIN urusan_bidang
        ON urusan_bidang.kode_full = master_program.urusan_bidang_kode

        LEFT JOIN urusan
        ON urusan.kode_full = urusan_bidang.urusan_kode

        WHERE master_program.uraian LIKE '%`+cari+`%'
        `+filter_urusan+`
        
        LIMIT `+data_star+`,`+data_batas+`
    `;

    db.query(jml_data, (err, row) => {
        if (err) {
            console.log(err);
            res.json(err)
        } else {
            halaman = Math.ceil(row.length / data_batas);
            if (halaman < 1) { halaman = 1 }
            db.query(view, (err, result) => {
                if (err) { res.json(err) }
                else {
                    halaman = Math.ceil(row.length / data_batas);
                    if (halaman < 1) { halaman = 1 }
                    res.json({
                        data: result,
                        jml_data: halaman
                    })
                }
            })
        }
    })
});

router.post('/addData', (req, res) => {
    console.log(req.body);
    let insert = `
        INSERT INTO master_program (urusan_kode , urusan_bidang_kode ,kode, kode_full, uraian, keterangan, createBy, createAt)
        VALUES (
            '`+req.body.urusan_kode+`',
            '`+req.body.urusan_bidang_kode+`',
            '`+req.body.kode+`',
            '`+req.body.urusan_bidang_kode+'.'+req.body.kode+`',
            '`+req.body.uraian+`',
            '`+req.body.keterangan+`',
            '`+req.user._id+`',
            NOW()
        )
    `

    db.query(insert, (err, row) => {
        if (err) {
            console.log('errrrooorrr');
            console.log(err);
            res.send(err);
        } else {
            // console.log(row);
            res.send(row);
        }
    })
    console.log(req.body);
});

router.post('/editData', (req,res)=>{
    var query = `
        UPDATE master_program SET
        urusan_kode = '`+req.body.urusan_kode+`',
        urusan_bidang_kode = '`+req.body.urusan_bidang_kode+`',
        kode = '`+req.body.kode+`',
        kode_full = '`+req.body.urusan_bidang_kode+'.'+req.body.kode+`',
        uraian     = '`+req.body.uraian+`',
        keterangan = '`+req.body.keterangan+`',
        editeBy    = '`+req.user._id+`',
        editeAt    = NOW()

        WHERE id = '`+req.body.id+`' 
    `;

    db.query(query, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            res.send(row);
        }
    }) 
});

router.post('/removeData', (req, res)=> {
    var query = `
        DELETE FROM master_program WHERE id = '`+req.body.id+`';
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
});


router.post('/list_autocomplete', (req, res) => {
    console.log(req.body)

   


    let view = ` 
        SELECT 
        master_program.*,
        urusan_bidang.uraian as urusan_bidang_uraian,
        urusan_bidang.kode_full as urusan_bidang_kode,
        urusan.uraian as urusan_uraian,
        urusan.kode as urusan_kode

        FROM master_program

        LEFT JOIN urusan_bidang
        ON urusan_bidang.kode_full = master_program.urusan_bidang_kode

        LEFT JOIN urusan
        ON urusan.kode_full = urusan_bidang.urusan_kode

        JOIN master_unit_kerja
        ON master_unit_kerja.urusan_bidang_kode = urusan_bidang.kode_full

        WHERE 
        master_unit_kerja.unit_kerja_id = '`+req.body.unit_kerja_id+`' AND
        master_program.uraian LIKE '%`+req.body.val+`%'

    `;
    db.query(view, (err, row)=>{
        if (err) {
            console.log(err);
            res.json(err)
        }else{
            res.json(row)
        }
    })
});



module.exports = router;
const express = require('express');
var db = require('../../../../db/MySql/umum');
const router = express.Router();


router.post('/list', (req, res) => {
    // console.log(req.body)

    var filterByUrusan = ''

    if (req.body.urusan_kode == null || req.body.urusan_kode == undefined || req.body.urusan_kode == "") {
        filterByUrusan = ''
    } else {
        filterByUrusan = `WHERE urusan_bidang.urusan_kode = '`+req.body.urusan_kode+`'`
    }


    let view = ` 
        SELECT 
        urusan_bidang.*
        FROM urusan_bidang
        `+filterByUrusan+`
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

    // console.log(req.body);


    var filter_urusan = ''
    if (req.body.urusan_kode == null || req.body.urusan_kode == undefined || req.body.urusan_kode == '') {
        filter_urusan = ''
    }else{
        filter_urusan = `AND urusan_bidang.urusan_kode = '`+req.body.urusan_kode+`'`
    }

    let jml_data = ` 
        SELECT urusan_bidang.* 
        FROM urusan_bidang

        WHERE urusan_bidang.uraian LIKE '%`+cari+`%'
        `+filter_urusan+`
        
    `;

    let view = `
        SELECT 
        urusan_bidang.*,
        urusan.uraian as urusan_uraian,
        urusan.kode as urusan_kode

        FROM urusan_bidang

        LEFT JOIN urusan
        ON urusan.kode_full = urusan_bidang.urusan_kode

        WHERE urusan_bidang.uraian LIKE '%`+cari+`%'
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
    // console.log(req.body);
    let insert = `
        INSERT INTO urusan_bidang (urusan_kode , kode, kode_full, uraian, keterangan, createBy, createAt)
        VALUES (
            '`+req.body.urusan_kode+`',
            '`+req.body.kode+`',
            '`+req.body.urusan_kode+'.'+req.body.kode+`',
            '`+req.body.uraian+`',
            '`+req.body.keterangan+`',
            '`+req.user._id+`',
            NOW()
        )
    `

    db.query(insert, (err, row) => {
        if (err) {
            // console.log('errrrooorrr');
            console.log(err);
            res.send(err);
        } else {
            // console.log(row);
            res.send(row);
        }
    })
    // console.log(req.body);
});

router.post('/editData', (req,res)=>{
    var query = `
        UPDATE urusan_bidang SET
        urusan_kode = '`+req.body.urusan_kode+`',
        kode = '`+req.body.kode+`',
        kode_full = '`+req.body.urusan_kode+'.'+req.body.kode+`',
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
        DELETE FROM urusan_bidang WHERE id = '`+req.body.id+`';
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
});



module.exports = router;
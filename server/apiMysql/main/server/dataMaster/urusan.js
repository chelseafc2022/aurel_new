const express = require('express');
var db = require('../../../../db/MySql/umum');
const router = express.Router();




router.post('/list', (req, res) => {
    // console.log(req.body)
    let view = ` 
        SELECT 
        urusan.*
        FROM urusan 
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
    // console.log(req.body);
    var data_batas = parseInt(req.body.page_limit);
    var data_star = (req.body.data_ke - 1) * data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    let jml_data = ` SELECT * FROM urusan `;

    let view = `
        SELECT * FROM urusan
        LIMIT `+data_star+`,`+data_batas+`
    `;

    db.query(jml_data, (err, row) => {
        if (err) {
            console.log(err);
            res.json(err)
        } else {
            halaman = Math.ceil(row.length / data_batas);
            if (halaman < 1) { halaman = 1 }
            db.query(view, (err1, result) => {
                if (err1) {
                    console.log(err1); 
                    res.json(err1) 
                }
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
        INSERT INTO urusan (kode, kode_full, uraian, keterangan, createBy, createAt)
        VALUES (
            '`+req.body.kode+`',
            '`+req.body.kode+`',
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
    // console.log(req.body);
});

router.post('/editData', (req,res)=>{
    var query = `
        UPDATE urusan SET
        kode = '`+req.body.kode+`',
        kode_full = '`+req.body.kode+`',
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
    // console.log(req.body);
    var query = `
        DELETE FROM urusan WHERE id = `+req.body.id+`;
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
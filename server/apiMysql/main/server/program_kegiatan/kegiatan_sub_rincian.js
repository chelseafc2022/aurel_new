const express = require('express');
var db = require('../../../../db/MySql/umum');
const router = express.Router();


router.post('/addData', (req, res) => {
    let insert = `
        INSERT INTO kegiatan_sub_rincian (kegiatan_sub_kode , uraian, koefisien, satuan, harga, ppn, jml, createBy, createAt)
        VALUES (
            '${req.body.kegiatan_sub_kode}',
            '${req.body.uraian}',
            '${req.body.koefisien}',
            '${req.body.satuan}',
            ${req.body.harga},
            ${req.body.ppn},
            ${req.body.jml},
            '${req.user._id}',
            NOW()
        )
    `

    db.query(insert, (err, row) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(row);
        }
    })
});


router.post('/editData', (req,res)=>{

    // console.log(req.body)
    console.log("EDIT KEGIATAN SUB RINCIAN TERPANGGIL")
    // res.send("ok")



    var query = `
        UPDATE kegiatan_sub_rincian SET
        uraian = '`+req.body.uraian+`',
        koefisien = '`+req.body.koefisien+`',
        satuan = '`+req.body.satuan+`',
        harga = `+req.body.harga+`,
        ppn = `+req.body.ppn+`,
        jml = `+req.body.jml+`,

        editeBy    = '`+req.user._id+`',
        editeAt    = NOW()

        WHERE id = `+req.body.id+` 
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

    console.log(req.body);


    var query = `
        DELETE FROM kegiatan_sub_rincian WHERE id = '`+req.body.id+`';
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



const express = require('express');
var db = require('../../../../db/MySql/umum');
const router = express.Router();


var removeLib = require('../../../library/removeLib');
var viewLib = require('../../../library/viewLib');


router.post('/list', (req, res) => {

    let view = ` 
        SELECT 
        kegiatan_sub_label.*
        FROM kegiatan_sub_label

        WHERE kegiatan_sub_label.kegiatan_sub_tag_id = '`+req.body.kegiatan_sub_tag_id+`'
    `;
    db.query(view, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(row)
        }
    })
});


router.post('/addData', (req, res) => {


    // console.log(req.body)
    console.log("ADD KEGIATAN SUB LABEL TERPANGGIL")
    // res.send("ok")

    // console.log("assss")

    var rincian = req.body.rincian

    // console.log(rincian);

    let insert = `
        INSERT INTO kegiatan_sub_label (kegiatan_sub_tag_id , uraian, createBy, createAt)
        VALUES (
            `+req.body.kegiatan_sub_tag_id+`,
            '`+req.body.uraian+`',
            '`+req.user._id+`',
            NOW()
        )
    `

    db.query(insert, async (err, row) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {

            await addRincian(rincian, row, req, res)



        }
    })


});


async function addRincian(rincian, row, req, res){



    // console.log(req.body);

    return new Promise((resolve, reject) => {
        

        rincian.forEach((element, index) => {


            let insertRincian = `
                INSERT INTO kegiatan_sub_rincian (kegiatan_sub_label_id , kegiatan_sub_kode, uraian, koefisien, satuan, harga, ppn, jml, createBy, createAt)
                VALUES (
                    `+row.insertId+`,
                    '`+req.body.kegiatan_sub_kode+`',
                    '`+element.uraian+`',
                    '`+element.koefisien+`',
                    '`+element.satuan+`',
                    `+element.harga+`,
                    `+element.ppn+`,
                    `+element.jml+`,
                    '`+req.user._id+`',
                    NOW()
                )
            `


            
            db.query(insertRincian, (err1, row1) => {
                if (err1) {
                    console.log(err1);
                    res.send(err1);
                } else {

                    


                    console.log("Sukses Injeksi Rincian ke-"+index);

                }
            })


            
        });



        res.send("OK");






    })



}

router.post('/editData1', (req,res)=>{

    console.log("EDIT1 KEGIATAN SUB LABEL TERPANGGIL")
    var rincian = req.body.rincian

    console.log(req.body);

    // res.send("OK")
    var query = `
        UPDATE kegiatan_sub_label SET
        uraian = '`+req.body.uraian+`',
        editeBy    = '`+req.user._id+`',
        editeAt    = NOW()
        WHERE id = '`+req.body.id+`' 
    `;

    db.query(query, async (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            res.send("OK")
        }
    }) 
});

router.post('/editData', (req,res)=>{

    console.log("EDIT KEGIATAN SUB LABEL TERPANGGIL")
    var rincian = req.body.rincian

    console.log(req.body);

    // res.send("OK")
    var query = `
        UPDATE kegiatan_sub_label SET
        uraian = '`+req.body.uraian+`',
        editeBy    = '`+req.user._id+`',
        editeAt    = NOW()
        WHERE id = '`+req.body.id+`' 
    `;

    db.query(query, async (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            await removeRincian(req)
            await replaceRincian(rincian, row, req, res)
        }
    }) 
});

async function replaceRincian(rincian, row, req, res){



    // console.log(req.body);

    return new Promise((resolve, reject) => {
        

        rincian.forEach((element, index) => {


            let insertRincian = `
                INSERT INTO kegiatan_sub_rincian (kegiatan_sub_label_id , kegiatan_sub_kode, uraian, koefisien, satuan, harga, ppn, jml, createBy, createAt)
                VALUES (
                    `+req.body.id+`,
                    '`+req.body.kegiatan_sub_kode+`',
                    '`+element.uraian+`',
                    '`+element.koefisien+`',
                    '`+element.satuan+`',
                    `+element.harga+`,
                    `+element.ppn+`,
                    `+element.jml+`,
                    '`+req.user._id+`',
                    NOW()
                )
            `


            
            db.query(insertRincian, (err1, row1) => {
                if (err1) {
                    console.log(err1);
                    res.send(err1);
                } else {

                    


                    console.log("Sukses Injeksi Rincian ke-"+index);

                }
            })


            
        });



        res.send("OK");






    })



}

async function removeRincian(req){

    return new Promise((resolve, reject) => {
        var query = `
            DELETE FROM kegiatan_sub_rincian WHERE kegiatan_sub_label_id = '`+req.body.id+`';
        `;
        db.query(query, (err, row)=>{
            if(err){
                // res.send(err);
                console.log(err);
            }else{
                // res.send(row);
                console.log("Sukses mereset data rincian");
                resolve(row)
            }
        });
    })



}


router.post('/removeData', (req, res)=> {

    console.log("REMOVE KEGIATAN LABEL DIPANGGIL");
    // console.log(req.body);
    // res.send("OK")


    var query = `
        DELETE FROM kegiatan_sub_label WHERE id = '`+req.body.id+`';
    `;
    db.query(query, async (err, row)=>{
        if(err){
            res.send(err);
        }else{
            await removeLib.removeRincianByLabel(req.body.id)
            res.send(row);
        }
    });
});





module.exports = router;



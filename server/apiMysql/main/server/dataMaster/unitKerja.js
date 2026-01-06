const express = require('express');
var db = require('../../../../db/MySql/simpeg');
var dbx = require('../../../../db/MySql/umum');
const router = express.Router();


router.post('/listreviu', (req, res) => {
    // console.log('list opd ddddd');
   
    let view = ` 
        SELECT id, unit_kerja, alamat FROM unit_kerja WHERE LOWER(unit_kerja)  LIKE LOWER('%`+req.body.cari+`%')
     `;

    db.query(view, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(row)
        }
    })
});

router.post('/list', (req, res) => {
    // console.log(req.body)

    var userx = req.user.profile


    var filter_akses = ''

    if (userx.akses_unit == 3 || userx.akses_unit == 2 ) {
        console.log("BISA AKSES SEMUA");
        filter_akses = ``
    } else {
        console.log("TIDAK BISA AKSES SEMUA");
        filter_akses = `AND unit_kerja.id = '`+userx.unit_kerja+`'` ;
    }


    let view = ` 
    SELECT 
        unit_kerja.*
    FROM unit_kerja 

    WHERE 
        unit_kerja.instansi = '`+req.body.instansi+`' 
        `+filter_akses+`
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

    // console.log("cari unit kerja");


    var data_batas = 10;
    
    if (req.body.page_limit == null || req.body.page_limit == undefined || req.body.page_limit == null) {
        data_batas = 10;
    } else {
        data_batas = req.body.page_limit;
    }
    
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    let jml_data = `
    SELECT 
    unit_kerja.id
    FROM simpeg.unit_kerja unit_kerja
    JOIN simpeg.instansi instansi
    ON unit_kerja.instansi = instansi.id
    WHERE 
    unit_kerja.penyedia_pbj = 1 AND 
    unit_kerja.unit_kerja LIKE '%`+cari+`%' 
    `;

    let view = `
    SELECT 
    unit_kerja.*,
    instansi.instansi as nama_instansi,

    (
        SELECT COUNT(master_unit_kerja.id)
        FROM
        monev_pembangunan.master_unit_kerja master_unit_kerja
        WHERE master_unit_kerja.unit_kerja_id = unit_kerja.id
    ) as jml_bidang_urusan

    FROM simpeg.unit_kerja unit_kerja

    JOIN simpeg.instansi instansi
    ON unit_kerja.instansi = instansi.id

    WHERE
    unit_kerja.penyedia_pbj = 1 AND 
    unit_kerja.unit_kerja LIKE '%`+cari+`%' 



    LIMIT `+data_star+`,`+data_batas+`
    `;

    // OR
    // instansi.instansi LIKE '%`+cari+`%'
    
    db.query(jml_data, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            halaman = Math.ceil(row.length/data_batas);
            if(halaman<1){halaman = 1}
            // ========================
            db.query(view, async (err, result)=>{
                if (err) {res.json(err)}
                else{



                    for (let i = 0; i < result.length; i++) {
                        result[i].urusan_bidang = await nested(result[i].id)
                    }





                    halaman = Math.ceil(row.length/data_batas);
                    if(halaman<1){halaman = 1}
                    res.json({
                        data : result,
                        jml_data : halaman,
                    })
                }
            })
            // ========================

        }
    })
});


router.post('/addData', (req, res) => {
    console.log(req.body);
    let insert = `
        INSERT INTO master_unit_kerja (unit_kerja_id, urusan_bidang_kode, utama, createBy, createAt)
        VALUES (
            '`+req.body.unit_kerja_id+`',
            '`+req.body.urusan_bidang_kode+`',
            `+req.body.utama+`,
            '`+req.user._id+`',
            NOW()
        )
    `

    dbx.query(insert, (err, row) => {
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
        UPDATE master_unit_kerja SET
        unit_kerja_id = '`+req.body.unit_kerja_id+`',
        urusan_bidang_kode = '`+req.body.urusan_bidang_kode+`',
        editeBy    = '`+req.user._id+`',
        editeAt    = NOW()

        WHERE id = '`+req.body.id+`' 
    `;

    dbx.query(query, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            res.send(row);
        }
    }) 
});

router.post('/removeData', (req, res)=> {

    console.log("============");
    console.log(req.body);
    console.log("============");
    var query = `
        DELETE FROM master_unit_kerja WHERE id = `+req.body.id+`;
    `;
    dbx.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
});


router.post('/autocomplete',(req,res)=>{


    console.log(req.body);

    var cari =''
    if (req.body.cari == null || req.body.cari == undefined || req.body.cari == '') {
        cari =''
    } else {
        cari = `WHERE unit_kerja.unit_kerja LIKE '%`+req.body.cari+`%'  `
        
    }


    let view = `
    SELECT unit_kerja.* 
    FROM unit_kerja

    `+cari+`
    LIMIT 20
    `


    db.query(view, (err, row) =>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }

    })



})



async function nested(unit_kerja_id){

    return new Promise((resolve, reject) => {
        
        let query = `
           SELECT 

           master_unit_kerja.id as id,
           master_unit_kerja.utama as utama,
           urusan_bidang.kode_full as kode_full,
           urusan_bidang.uraian as uraian
           
           FROM master_unit_kerja
           JOIN urusan_bidang
           ON urusan_bidang.kode_full = master_unit_kerja.urusan_bidang_kode


           WHERE master_unit_kerja.unit_kerja_id = '`+unit_kerja_id+`'
        `

        dbx.query(query, (err, row) => {
            if (err) {
                console.log('errrrooorrr');
                console.log(err);
            } else {
                // console.log(row);
                resolve(row)
            }
        })







    })


}



module.exports = router;
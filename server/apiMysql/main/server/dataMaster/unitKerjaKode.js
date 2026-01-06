const express = require('express');
var db = require('../../../../db/MySql/simpeg');
var dbx = require('../../../../db/MySql/umum');
const router = express.Router();




router.post('/list', (req, res) => {
    // console.log(req.body)
    let view = ` 
    SELECT 
        unit_kerja.*
    FROM unit_kerja 

    WHERE 
        unit_kerja.instansi = '`+req.body.instansi+`' 
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
    unit_kerja.unit_kerja LIKE '%`+cari+`%' 
    `;

    let view = `
    SELECT 
    unit_kerja.*,
    instansi.instansi as nama_instansi,

    (
        SELECT COUNT(master_unit_kerja_kode.id)
        FROM
        monev_pembangunan.master_unit_kerja_kode master_unit_kerja_kode
        WHERE master_unit_kerja_kode.unit_kerja_id = unit_kerja.id
    ) as jml_bidang_urusan

    FROM simpeg.unit_kerja unit_kerja

    JOIN simpeg.instansi instansi
    ON unit_kerja.instansi = instansi.id

    WHERE 
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


router.post('/checkUpdateData', (req, res) => {

    var query = `
        SELECT master_unit_kerja_kode.id 
        
        FROM master_unit_kerja_kode
        WHERE unit_kerja_id = '`+req.body.unit_kerja_id+`'
    
    `

    db.query(query, (err, row)=>{

        if (row.length <= 0) {
            AddDAta(req, res)
        } else {
            EditData(req, res)
        }

    })


    

});



const EditData = (req, res)=>{
    var query = `
        UPDATE master_unit_kerja_kode SET
        unit_kerja_id = '`+req.body.unit_kerja_id+`',
        kode = '`+req.body.kode+`',
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


}


const AddDAta = (req, res)=>{

    let insert = `
        INSERT INTO master_unit_kerja_kode (unit_kerja_id, kode, createBy, createAt)
        VALUES (
            '`+req.body.unit_kerja_id+`',
            '`+req.body.kode+`',
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


}


module.exports = router;
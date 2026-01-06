const express = require('express');
var db = require('../../../../db/MySql/trista_monev');

const fs = require('fs');

// var multer=require("multer");
// var upload = require('../../../../db/multer/pdf');

var uniqid = require('uniqid');
const { log } = require('console');
const router = express.Router();





router.post('/view', (req, res) => {
    var data_batas = req.body.page_limit;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    console.log(req.body.tipeku + "tipeeeku");

    var unit = '' 
    if (req.body.tipe==17 || req.body.unit_kerja == '' || req.body.unit_kerja == null || req.body.unit_kerja == undefined ) {
        unit = ``
    } else {
        unit = ` AND saldo_kas.unit_kerja_id = '`+req.body.unit_kerja+`'`
    }



    let jml_data = `
    SELECT
    saldo_kas.*,
    unit_kerja.unit_kerja as unit_kerja_uraian,
  
    
    users.username as username

    FROM trista_monev.saldo_kas saldo_kas

    
    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON saldo_kas.unit_kerja_id = unit_kerja.id


    LEFT JOIN egov.users users
    ON users.id = saldo_kas.createBy
        


        WHERE 
        saldo_kas.unit_kerja_id LIKE '%`+cari+`%'
        `+unit+`
        AND saldo_kas.tahun = `+req.body.tahun+`

        ORDER BY saldo_kas.createAt DESC

        
    `

    let view = `
    SELECT
    saldo_kas.*,
    unit_kerja.unit_kerja as unit_kerja_uraian,
    
    
    users.username as username

    FROM trista_monev.saldo_kas saldo_kas

    
    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON saldo_kas.unit_kerja_id = unit_kerja.id


    LEFT JOIN egov.users users
    ON users.id = saldo_kas.createBy
        


        WHERE 
        
        saldo_kas.unit_kerja_id LIKE '%`+cari+`%'
        `+unit+`
        AND saldo_kas.tahun = `+req.body.tahun+`
        LIMIT `+data_star+`,`+data_batas+`

        
        
    `
    db.query(jml_data, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            halaman = Math.ceil(row.length/data_batas);
            if(halaman<1){halaman = 1}
            // ========================
            db.query(view, (err, result)=>{
                if (err) {res.json(err)}
                else{
                    halaman = Math.ceil(row.length/data_batas);
                    if(halaman<1){halaman = 1}
                    res.json({
                        data : result,
                        jml_data : halaman
                    })
                }
            })
            // ========================

        }
    })
});

router.post('/view1', (req, res) => {
    var data_batas = req.body.page_limit;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    var instansi
    if (req.body.unit_kerja == null || req.body.unit_kerja == '' || req.body.unit_kerja == undefined) {
        instansi = ``
    } else {
        // instansi = `AND opd_dipilih.id_instansi = '`+req.body.id_instansi+`' `
        instansi = `AND saldo_kas.unit_kerja_id = '`+req.body.unit_kerja+`'`

    }

    var bkunya = '';

    if (req.body.id_bku == null || req.body.id_bku == '' || req.body.id_bku == undefined) {
        bkunya = ``
    } else {
        // instansi = `AND opd_dipilih.id_instansi = '`+req.body.id_instansi+`' `
        bkunya = `AND saldo_kas.id_bku = '`+req.body.id_bku+`'`

    }


    let jml_data = `
    SELECT
    saldo_kas.*,
    unit_kerja.unit_kerja as unit_kerja_uraian,
    
    bku.uraian as id_bku,
    bulan.bulan as nama_bulan,
    ( SELECT

        SUM(saldo_kas.saldo+saldo_kas.non_saldo)
 		

    ) as total_saldo,
    
    users.username as username

    FROM trista_monev.saldo_kas saldo_kas

    
    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON saldo_kas.unit_kerja_id = unit_kerja.id

    LEFT JOIN trista_monev.bku bku
    ON saldo_kas.id_bku = bku.id
    
    LEFT JOIN bulan
    ON saldo_kas.bulan = bulan.id


    LEFT JOIN egov.users users
    ON users.id = saldo_kas.createBy
        


        WHERE 
        saldo_kas.unit_kerja_id LIKE '%`+cari+`%'
        `+bkunya+`
        `+instansi+`

        ORDER BY saldo_kas.createAt DESC

        
    `

    let view = `
    SELECT
    saldo_kas.*,
    unit_kerja.unit_kerja as unit_kerja_uraian,
    
    bku.uraian as id_bku,
    ( SELECT

        SUM(saldo_kas.saldo+saldo_kas.non_saldo)
 		

    ) as total_saldo,
    bulan.bulan as nama_bulan,
    
    users.username as username

    FROM trista_monev.saldo_kas saldo_kas

    
    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON saldo_kas.unit_kerja_id = unit_kerja.id

    LEFT JOIN trista_monev.bku bku
    ON saldo_kas.id_bku = bku.id
    
    LEFT JOIN bulan
    ON saldo_kas.bulan = bulan.id



    LEFT JOIN egov.users users
    ON users.id = saldo_kas.createBy
        

        WHERE 
        
        saldo_kas.unit_kerja_id LIKE '%`+cari+`%'
        `+bkunya+`
        `+instansi+`
        ORDER BY saldo_kas.bulan ASC
        LIMIT `+data_star+`,`+data_batas+`

        
        
    `
    db.query(jml_data, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            halaman = Math.ceil(row.length/data_batas);
            if(halaman<1){halaman = 1}
            // ========================
            db.query(view, (err, result)=>{
                if (err) {res.json(err)}
                else{
                    halaman = Math.ceil(row.length/data_batas);
                    if(halaman<1){halaman = 1}
                    res.json({
                        data : result,
                        jml_data : halaman
                    })
                }
            })
            // ========================

        }
    })
});


router.post('/addData',(req,res)=>{
    var id = uniqid()
    var data = req.body

    console.log(req.body);
    console.log("aaaaaa");
    


    let insert = `
    INSERT INTO saldo_kas ( saldo, non_saldo, berharga, total_saldo, tahun, unit_kerja_id, createAt, createBy)
    VALUES (
        
       `+data.saldo+`,
       `+data.non_saldo+`,
       '`+data.berharga+`',
       `+data.total_saldo+`,
       '`+data.tahun+`',
       '`+data.unit_kerja_id+`',
       NOW(),
       '`+req.user._id+`'
       )
   `

   db.query(insert, (err, row)=>{
       if(err) {
           console.log('errrrooorrr');
           console.log(err);
           res.send(err);
       }else{
           console.log(row);
           res.send(row);

       }
   })
   // console.log(req.body);
});




router.post('/editData', (req,res)=>{
    var id = uniqid()
      var data = req.body

      console.log(data);

    query = `

    UPDATE saldo_kas SET
    
    saldo = `+data.saldo+`,
    non_saldo = `+data.non_saldo+`,
    berharga = '`+data.berharga+`',
    total_saldo = `+data.total_saldo+`,
    tahun = '`+data.tahun+`',
    editeBy = '`+req.user._id+`',
    editeAt = NOW()

    WHERE id = '`+data.id+`'
    `;

    db.query(query, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            res.send(row);
        }
    })

})

router.post('/removeData', (req, res)=> {
   
    var query = `
        DELETE FROM saldo_kas WHERE id = '`+req.body.id+`';
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
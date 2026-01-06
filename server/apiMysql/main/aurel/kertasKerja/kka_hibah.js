const express = require('express');
var db = require('../../../../db/MySql/trista_monev');

const fs = require('fs');

var multer=require("multer");
var upload = require('../../../../db/multer/pdf');

var uniqid = require('uniqid');
const { log } = require('console');
const router = express.Router();





router.post('/view', (req, res) => {
    var data_batas = req.body.page_limit;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    var instansi
    if (req.body.tipe==1) {
        instansi = ``
    } else {
        // instansi = `AND opd_dipilih.id_instansi = '`+req.body.id_instansi+`' `
        instansi = `kertas_kerja.unit_kerja_id = '`+req.body.unit_kerja_id+`' AND`

    }
    
    var bkunya = '';

    if (req.body.id_bku == null || req.body.id_bku == '' || req.body.id_bku == undefined) {
        bkunya = ``
    } else {
        // instansi = `AND opd_dipilih.id_instansi = '`+req.body.id_instansi+`' `
        bkunya = `kertas_kerja.id_bku = '`+req.body.id_bku+`' AND`

    }

    var jenis = '';

    if (req.body.jenis == null || req.body.jenis == '' || req.body.jenis == undefined) {
        jenis = ``
    } else {
        // instansi = `AND opd_dipilih.id_instansi = '`+req.body.id_instansi+`' `
        jenis = `kertas_kerja.jenis_permintaan = '`+req.body.jenis+`' AND`

    }



    let jml_data = `
    SELECT
    kertas_kerja.*,
    master_sumber.uraian as sumber_dana,
    master_permintaan.jenis_permintaan as jenis_permintaan,
    bku.uraian as id_bku_uraian


    FROM trista_monev.kertas_kerja kertas_kerja

    LEFT JOIN trista_monev.bku bku
    ON kertas_kerja.id_bku = bku.id 

    LEFT JOIN trista_monev.master_adm master_adm
    ON kertas_kerja.jenis_adm = master_adm.id

    LEFT JOIN trista_monev.master_sumber master_sumber
    ON kertas_kerja.sumber_dana = master_sumber.id
    
    LEFT JOIN trista_monev.master_permintaan master_permintaan
    ON kertas_kerja.jenis_permintaan = master_permintaan.id 
    
    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON kertas_kerja.unit_kerja_id = unit_kerja.id


    LEFT JOIN egov.users users
    ON users.id = kertas_kerja.createBy
        


        WHERE kertas_kerja.jenis_adm = '6' AND 
        `+instansi+`
        
        `+bkunya+`
        `+jenis+`
        kertas_kerja.uraian LIKE '%`+cari+`%'
        ORDER BY kertas_kerja.createAt DESC

        
    `

    let view = `
    SELECT
    kertas_kerja.*,
    master_sumber.uraian as sumber_dana,
    master_permintaan.jenis_permintaan as jenis_permintaan,
    bku.uraian as id_bku_uraian

    FROM trista_monev.kertas_kerja kertas_kerja

    LEFT JOIN trista_monev.bku bku
    ON kertas_kerja.id_bku = bku.id 


    LEFT JOIN trista_monev.master_adm master_adm
    ON kertas_kerja.jenis_adm = master_adm.id

    LEFT JOIN trista_monev.master_sumber master_sumber
    ON kertas_kerja.sumber_dana = master_sumber.id 

    LEFT JOIN trista_monev.master_permintaan master_permintaan
    ON kertas_kerja.jenis_permintaan = master_permintaan.id 

    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON kertas_kerja.unit_kerja_id = unit_kerja.id


    LEFT JOIN egov.users users
    ON users.id = kertas_kerja.createBy

        WHERE kertas_kerja.jenis_adm = '6' AND
        `+instansi+`
        
        `+bkunya+`
        `+jenis+`
        kertas_kerja.uraian LIKE '%`+cari+`%'
        ORDER BY kertas_kerja.createAt DESC
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
            instansi = `AND kertas_kerja.unit_kerja_id = '`+req.body.unit_kerja+`' `

    }
    
    var bkunya = '';

    if (req.body.id_bku == null || req.body.id_bku == '' || req.body.id_bku == undefined) {
        bkunya = ``
    } else {
        // instansi = `AND opd_dipilih.id_instansi = '`+req.body.id_instansi+`' `
        bkunya = `AND kertas_kerja.id_bku = '`+req.body.id_bku+`'
        
        `

    }

    var jenis = '';

    if (req.body.jenis == null || req.body.jenis == '' || req.body.jenis == undefined) {
        jenis = ``
    } else {
        // instansi = `AND opd_dipilih.id_instansi = '`+req.body.id_instansi+`' `
        jenis = `AND kertas_kerja.jenis_permintaan = '`+req.body.jenis+`' `

    }



    let jml_data = `
    SELECT
    kertas_kerja.*,
    master_sumber.uraian as sumber_dana, unit_kerja.unit_kerja as unit_kerja_uraian,
    master_permintaan.jenis_permintaan as jenis_permintaan,
    bku.uraian as id_bku_uraian,
    users.username as username,

    (
        SELECT CONCAT((kertas_kerja.nilai / kertas_kerja.realisasi_keuangan) * 100 , '%')
    ) as realisasifisik,
    (
        SELECT kertas_kerja.nilai - kertas_kerja.realisasi_keuangan
    ) as selisihrealisasi,
    (SELECT 
        DATEDIFF ( 
            kertas_kerja.tglsampai,
            kertas_kerja.tgldari
            
            )
        ) as selisih
    
    FROM trista_monev.kertas_kerja kertas_kerja

    LEFT JOIN trista_monev.bku bku
    ON kertas_kerja.id_bku = bku.id 

    LEFT JOIN trista_monev.master_adm master_adm
    ON kertas_kerja.jenis_adm = master_adm.id

    LEFT JOIN trista_monev.master_sumber master_sumber
    ON kertas_kerja.sumber_dana = master_sumber.id 

    LEFT JOIN trista_monev.master_permintaan master_permintaan
    ON kertas_kerja.jenis_permintaan = master_permintaan.id 

    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON kertas_kerja.unit_kerja_id = unit_kerja.id


    LEFT JOIN egov.users users
    ON users.id = kertas_kerja.createBy
        

        


    WHERE kertas_kerja.jenis_adm = '6' AND
        
    kertas_kerja.uraian LIKE '%`+cari+`%'
    `+instansi+`
    `+bkunya+`
    `+jenis+`
    ORDER BY kertas_kerja.createAt DESC
        
    `

    let view = `
    SELECT
    kertas_kerja.*,
    master_sumber.uraian as sumber_dana, unit_kerja.unit_kerja as unit_kerja_uraian,
    master_permintaan.jenis_permintaan as jenis_permintaan,
    bku.uraian as id_bku_uraian,
    users.username as username,

    (
        SELECT CONCAT((kertas_kerja.nilai / kertas_kerja.realisasi_keuangan) * 100 , '%')
    ) as realisasifisik,
    (
        SELECT kertas_kerja.nilai - kertas_kerja.realisasi_keuangan
    ) as selisihrealisasi, 
    
    (SELECT 
        DATEDIFF ( 
            kertas_kerja.tglsampai,
            kertas_kerja.tgldari
            
            )
        ) as selisih
    
    FROM trista_monev.kertas_kerja kertas_kerja

    LEFT JOIN trista_monev.bku bku
    ON kertas_kerja.id_bku = bku.id 


    LEFT JOIN trista_monev.master_adm master_adm
    ON kertas_kerja.jenis_adm = master_adm.id

    LEFT JOIN trista_monev.master_sumber master_sumber
    ON kertas_kerja.sumber_dana = master_sumber.id 

    LEFT JOIN trista_monev.master_permintaan master_permintaan
    ON kertas_kerja.jenis_permintaan = master_permintaan.id 

    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON kertas_kerja.unit_kerja_id = unit_kerja.id


    LEFT JOIN egov.users users
    ON users.id = kertas_kerja.createBy

        WHERE kertas_kerja.jenis_adm = '6' AND
        
        kertas_kerja.uraian LIKE '%`+cari+`%'
        `+instansi+`
        `+bkunya+`
        `+jenis+`
        ORDER BY kertas_kerja.createAt DESC
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


router.post('/tanggapan', (req, res) => {
    var data = req.body 
   console.log(data);
   console.log(data.status);

   var status = '';
   if (req.body.status == '' || req.body.status==undefined || req.body.status == null) {
        status = ``
   } else {
        status = `
        
        AND status = '`+req.body.status+`'
        
        `
   }

    let view = `
    SELECT tanggapan.*
    
    FROM trista_monev.tanggapan tanggapan 
    
    WHERE id_bku = '`+data.id_bku+`' 
    AND unit_kerja_id = '`+data.unit_kerja_id+`' 
    AND jenis_adm = '`+data.jenis_adm+`'  
    `+status+`

        
    `
    
            // ========================
            db.query(view, (err, result)=>{
                if (err) {res.json(err)}
                else{
                    console.log('asdasdasd '+result);
                    res.json({
                        data : result,
                        
                    })
                }
            })
            // ========================

});

router.post('/addDatax',upload.single("file"), (req,res)=>{

    var data = req.body;
    var file = req.file;

    console.log(data);
    
    if (file==undefined) {
        
        let insert = `INSERT INTO tanggapan (id, id_bku, unit_kerja_id, jenis_adm, status, tanggapan, createAt, createBy)
       VALUES (
           '`+uniqid()+`',
           '`+data.id_bku+`',
           '`+data.unit_kerja_id+`',
           '`+data.jenis_adm+`',
           '`+data.status+`',
           '`+data.tanggapan+`',
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

    } else {

         let insert = `INSERT INTO tanggapan (id, id_bku, unit_kerja_id, jenis_adm, uraian, status, tanggapan, file, file_type, createAt, createBy)
       VALUES (
           '`+uniqid()+`',
           '`+data.id_bku+`',
           '`+data.unit_kerja_id+`',
           '`+data.jenis_adm+`',
           '`+data.uraian+`',
           '`+data.status+`',
           '`+data.tanggapan+`',
           '`+file.filename+`',
           '`+file.mimetype+`',
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
    }



    // console.log(req.body);
    // res.send('OK')
});


router.post('/addData',(req,res)=>{
    var id = uniqid()
    var data = req.body.form

    console.log(req.body.form);

    let insert = `
    INSERT INTO kertas_kerja (
        id,
        id_bku,
        jenis_adm,
        uraian,
        sumber_dana,
        jenis_permintaan,
        tgl,
        nomor,
        nilai,
        penyedia,
        penyedia_penerima,
        penyedia_alamat,
        keterangan, 
        unit_kerja_id,
        createAt, 
        createBy)
    VALUES (

       '`+id+`',
       '`+data.id_bku+`',
       '`+data.jenis_adm+`',
       '`+data.uraian+`',
       '`+data.sumber_dana+`',
       '`+data.jenis_permintaan+`',
       '`+data.tgl+`',
       '`+data.nomor+`',
       '`+data.nilai+`',
       '`+data.penyedia+`',
       '`+data.penyedia_penerima+`',
       '`+data.penyedia_alamat+`',
       '`+data.keterangan+`',
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
      var data = req.body.form

    query = `

    UPDATE kertas_kerja SET

    id_bku = '`+data.id_bku+`',
    uraian = '`+data.uraian+`',
    sumber_dana = '`+data.sumber_dana+`',
    jenis_permintaan = '`+data.jenis_permintaan+`',
    tgl = '`+data.tgl+`',
    nomor = '`+data.nomor+`',
    nilai = '`+data.nilai+`',
    penyedia = '`+data.penyedia+`',
    penyedia_penerima = '`+data.penyedia_penerima+`',
    penyedia_alamat = '`+data.penyedia_alamat+`',
    keterangan = '`+data.keterangan+`',
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
        DELETE FROM kertas_kerja WHERE id = '`+req.body.id+`';
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})


router.post('/removeDatax', (req, res)=> {
   
    var query = `
        DELETE FROM tanggapan WHERE id = '`+req.body.id+`';
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
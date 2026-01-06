const express = require('express');
var db = require('../../../../db/MySql/trista_monev');

const fs = require('fs');

var multer=require("multer");
var upload = require('../../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();



router.get('/', (req, res) => {

    let query = `
        SELECT
        file.*
        FROM file
    `
    db.query(query, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(row)
        }
    })
});



router.post('/view', (req, res) => {
    var data_batas = req.body.page_limit;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;
    var data = req.body

    console.log(data);
    console.log("asdasdad");

    var filter_unit_kerja = ''

    var unit = '' 
    if (req.body.tipe==17 || req.body.unit_kerja == '' || req.body.unit_kerja == null || req.body.unit_kerja == undefined ) {
        unit = ``
    } else {
        unit = ` AND rekening.unit_kerja_id = '`+req.body.unit_kerja+`'`
    }


    let jml_data = `
        SELECT
        rekening.*, 
        unit_kerja.unit_kerja as unit_kerja_uraian,
        biodata.nama as nama

        FROM trista_monev.rekening rekening

        LEFT JOIN egov.users users
        ON users.id = rekening.createBy

        LEFT JOIN simpeg.instansi instansi
        ON rekening.unit_kerja_id = instansi.id

        LEFT JOIN simpeg.unit_kerja unit_kerja
        ON rekening.unit_kerja_id = unit_kerja.id


        LEFT JOIN simpeg.biodata biodata
        ON biodata.nip = users.nama_nip

        WHERE rekening.uraian LIKE '%`+cari+`%'
        `+unit+`
        AND rekening.tahun = `+req.body.tahun+`
        ORDER BY rekening.createAt DESC

    `
    let query = `
        SELECT
        rekening.*, 
        unit_kerja.unit_kerja as unit_kerja_uraian,
        biodata.nama as nama

        FROM trista_monev.rekening rekening

        LEFT JOIN egov.users users
        ON users.id = rekening.createBy

        LEFT JOIN simpeg.instansi instansi
        ON rekening.unit_kerja_id = instansi.id


        LEFT JOIN simpeg.unit_kerja unit_kerja
        ON rekening.unit_kerja_id = unit_kerja.id

        LEFT JOIN simpeg.biodata biodata
        ON biodata.nip = users.nama_nip

        WHERE 
        rekening.unit_kerja_id LIKE '%`+cari+`%'
        `+unit+`
        AND rekening.tahun = `+req.body.tahun+`
        LIMIT `+data_star+`,`+data_batas+`

    `
    db.query(jml_data, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            halaman = Math.ceil(row.length/data_batas);
            if(halaman<1){halaman = 1}
            // ========================
            db.query(query, (err, result)=>{
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
    var data = req.body

    console.log(data);

    var instansi = '';

    if (req.body.unit_kerja == null || req.body.unit_kerja == '' || req.body.unit_kerja == undefined) {
        instansi = ``
    } else {
        // instansi = `AND opd_dipilih.id_instansi = '`+req.body.id_instansi+`' `
        instansi = ` AND rekening.unit_kerja_id = '`+req.body.unit_kerja+`' `
    }


    let jml_data = `
        SELECT
        rekening.*, 
        unit_kerja.unit_kerja as unit_kerja_uraian, 
        biodata.nama as nama

        FROM trista_monev.rekening rekening

        LEFT JOIN egov.users users
        ON users.id = rekening.createBy

        LEFT JOIN simpeg.instansi instansi
        ON rekening.unit_kerja_id = instansi.id


        LEFT JOIN simpeg.unit_kerja unit_kerja
        ON rekening.unit_kerja_id = unit_kerja.id

        LEFT JOIN simpeg.biodata biodata
        ON biodata.nip = users.nama_nip

        WHERE 
        rekening.uraian LIKE '%`+cari+`%'
        `+instansi+`
        ORDER BY rekening.createAt DESC

    `
    let query = `
        SELECT
        rekening.*, 
        unit_kerja.unit_kerja as unit_kerja_uraian, 
        biodata.nama as nama

        FROM trista_monev.rekening rekening

        LEFT JOIN egov.users users
        ON users.id = rekening.createBy

        LEFT JOIN simpeg.instansi instansi
        ON rekening.unit_kerja_id = instansi.id


        LEFT JOIN simpeg.unit_kerja unit_kerja
        ON rekening.unit_kerja_id = unit_kerja.id

        LEFT JOIN simpeg.biodata biodata
        ON biodata.nip = users.nama_nip

        WHERE 
        rekening.uraian LIKE '%`+cari+`%'
        `+instansi+`
        LIMIT `+data_star+`,`+data_batas+`

    `
    db.query(jml_data, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            halaman = Math.ceil(row.length/data_batas);
            if(halaman<1){halaman = 1}
            // ========================
            db.query(query, (err, result)=>{
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

router.post('/addData',upload.single("file"), (req,res)=>{

    var pb = JSON.parse(req.body.pb);
    var file = req.file;
    

    // console.log('============ PB =================');

     let insert = `INSERT INTO rekening (id, unit_kerja_id, tahun, uraian, keterangan, file, file_type, createAt, createBy)
    VALUES (
        '`+uniqid()+`',
        '`+pb.unit_kerja_id+`',
        '`+pb.tahun+`',
        '`+pb.uraian+`',
        '`+pb.keterangan+`',
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

    // console.log(req.body);
    // res.send('OK')
});

router.post('/editData',upload.single("file"), (req,res)=>{
    var pb = JSON.parse(req.body.pb);
    var file = req.file;

    console.log(pb);



    if (req.file == undefined) {
        // console.log("tidak ada file")
        var insert = `
            UPDATE rekening SET
            tahun = '`+pb.tahun+`',
            uraian = '`+pb.uraian+`',
            keterangan = '`+pb.keterangan+`',
            editeBy = '`+req.user._id+`',
            editeAt =  NOW()

            WHERE id = '`+pb.id+`'

        `
    } else {
        var insert = `
            UPDATE rekening SET
            tahun = '`+pb.tahun+`',
            uraian = '`+pb.uraian+`',
            keterangan = '`+pb.keterangan+`',
            file = '`+file.filename+`',
            file_type = '`+file.mimetype+`',

            editeBy = '`+req.user._id+`',
            editeAt =  NOW()

            WHERE id = '`+pb.id+`'

        `
        hapus_file(req.body.fileOld);
    }


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
    // res.send('OK')
});

router.post('/removeData', (req, res)=> {
    var file = req.body.file
    hapus_file(file);

    var query = `
        DELETE FROM rekening WHERE id = '`+req.body.id+`';
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})




function hapus_file(file){
    const path = 'uploads/'+file;

    fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
          return
        }
    })

}

module.exports = router;
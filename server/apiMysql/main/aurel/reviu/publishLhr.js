const express = require('express');
var db = require('../../../../db/MySql/trista_monev');

const fs = require('fs');

var multer=require("multer");
var upload = require('../../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();



router.post('/view', (req, res) => {
    var data_batas = req.body.page_limit;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    var data = req.body
    var instansi = '';
    if (req.body.tipe_user==12) {
        instansi = ``
    
    } else {
        if (req.body.tipe_user==1 || req.body.tipe_user==8 || req.body.tipe_user==6) {
            instansi = ``
        } else {
            instansi = `AND opd_publish.id_instansi = '`+req.body.unit_kerja+`'`
        }

    }
    

    let jml_data = `
    SELECT
    publish_lhr.*, 
    unit_kerja.unit_kerja as unit_kerja_uraian

    FROM trista_monev.publish_lhr publish_lhr

    LEFT JOIN egov.users users
    ON users.id = publish_lhr.createBy

    LEFT JOIN simpeg.instansi instansi
    ON publish_lhr.unit_kerja_id = instansi.id

    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON publish_lhr.unit_kerja_id = unit_kerja.id

    LEFT JOIN simpeg.biodata biodata
    ON biodata.nip = users.nama_nip

    LEFT JOIN trista_monev.opd_publish opd_publish
    ON publish_lhr.id = opd_publish.id_publish
    WHERE 
    publish_lhr.uraian LIKE '%`+cari+`%'

    `+instansi+`
    
    ORDER BY publish_lhr.createAt DESC

`
    let view = `
    SELECT
    publish_lhr.*, 
    unit_kerja.unit_kerja as unit_kerja_uraian

    FROM trista_monev.publish_lhr publish_lhr

    LEFT JOIN egov.users users
    ON users.id = publish_lhr.createBy

    LEFT JOIN simpeg.instansi instansi
    ON publish_lhr.unit_kerja_id = instansi.id

    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON publish_lhr.unit_kerja_id = unit_kerja.id

    LEFT JOIN simpeg.biodata biodata
    ON biodata.nip = users.nama_nip

    LEFT JOIN trista_monev.opd_publish opd_publish
    ON publish_lhr.id = opd_publish.id_publish

    WHERE 
    publish_lhr.uraian LIKE '%`+cari+`%'
    `+instansi+`
    
    
    ORDER BY publish_lhr.createAt DESC
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



router.post('/addData',upload.single("file"), (req,res)=>{
    // console.log(req.body.lokasi);
    var pb = JSON.parse(req.body.pb);
    var file = req.file;
    var lokasi = JSON.parse(req.body.lokasi);
    

    // console.log('============ PB =================');

    var id = uniqid();

     let insert = `INSERT INTO publish_lhr (id, tahun,unit_kerja_id, uraian, keterangan, file, file_type, createAt, createBy)
    VALUES (
        '`+id+`',
        '`+pb.tahun+`',
        '`+pb.unit_kerja_id+`',
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
            masukanOpd(lokasi, id)
            console.log(row);
            res.send(row);
        }
    })

    // console.log(req.body);
    // res.send('OK')
});

function masukanOpd(params, id) {
    console.log(id);
    console.log('query ke dua');
    var data = params
    // data.push(feed)
    console.log("aaaa" + data);

    

    for(var i in data){

        let insert = `
        INSERT INTO      (id, id_publish, id_instansi)
        VALUES (
        '`+uniqid()+`' ,
        '`+id+`',
        '`+data[i].id+`' 
         )
     `
         db.query(insert, (err, row)=>{
             if(err) {
                 console.log('error');
                //  console.log(err);
                //  res.send(err);
             }else{

                 console.log('sukseeees');
                //  console.log(row);
                //  res.send(row)
                }
            })
            
        }
    
}




router.post('/editData',upload.single("file"), (req,res)=>{
    var pb = JSON.parse(req.body.pb);
    var file = req.file;



    if (req.file == undefined) {
        // console.log("tidak ada file")
        var insert = `
            UPDATE publish_lhr SET
            tahun = '`+pb.tahun+`',
            uraian = '`+pb.uraian+`',
            keterangan = '`+pb.keterangan+`',

            editeBy = '`+req.user._id+`',
            editeAt =  NOW()

            WHERE id = '`+pb.id+`'

        `
    } else {
        var insert = `
            UPDATE publish_lhr SET
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
        DELETE FROM publish_lhr WHERE id = '`+req.body.id+`';
    `;

    var opdpub = `
    DELETE FROM opd_publish WHERE id_publish = '`+req.body.id+`';
`;

    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            db.query(opdpub, (err, row)=>{
                if(err){
                    res.send(err);
                }else{
                    res.send(row);
                }
            });
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
const express = require('express');
var db = require('../../../../db/MySql/umum');
const router = express.Router();

const fs = require('fs');

var upload = require('../../../../db/multer/pdf');



router.post('/getOne', async(req, res) => {
    var query = `
        SELECT 
        realisasi_keuangan_serapan.*,
        kegiatan_sub_rincian.uraian as kegiatan_sub_rincian_uraian,
        master_kegiatan_sub.uraian as kegiatan_sub_uraian,
        master_kegiatan.uraian as kegiatan_uraian
        
        FROM realisasi_keuangan_serapan

        LEFT JOIN kegiatan_sub_rincian
        ON kegiatan_sub_rincian.id = realisasi_keuangan_serapan.rincian_id


        LEFT JOIN master_kegiatan_sub
        ON master_kegiatan_sub.kode_full = kegiatan_sub_rincian.kegiatan_sub_kode

        LEFT JOIN master_kegiatan
        ON master_kegiatan.kode_full = master_kegiatan_sub.kegiatan_kode

        WHERE realisasi_keuangan_serapan.realisasi_keuangan_id = `+req.body.realisasi_keuangan_id+`

    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
    
});

router.post('/view', (req, res) => {
    // console.log(req.body);
    var data_batas = parseInt(req.body.page_limit);
    var data_star = (req.body.data_ke - 1) * data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    let jml_data = ` 
        SELECT 
        realisasi_keuangan_serapan.id

        FROM monev_pembangunan.realisasi_keuangan_serapan realisasi_keuangan_serapan

        LEFT JOIN trista_monev.master_permintaan master_permintaan
        ON master_permintaan.id = realisasi_keuangan_serapan.master_permintaan
    `;

    let view = `
        SELECT 
        realisasi_keuangan_serapan.*,
        master_permintaan.jenis_permintaan  as master_permintaan_uraian

        FROM monev_pembangunan.realisasi_keuangan_serapan realisasi_keuangan_serapan

        LEFT JOIN trista_monev.master_permintaan master_permintaan
        ON master_permintaan.id = realisasi_keuangan_serapan.master_permintaan


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


router.post('/addData',upload.single("file"), (req,res)=>{
    // console.log(req.body);


    var arrayx = req.body

    console.log(arrayx);



    arrayx.forEach((data, index) => {

        const now = new Date()
        const dd = now.getDate()
        const mm = now.getMonth() + 1
        const yy = now.getFullYear()
      
        let insert = `
          INSERT INTO realisasi_keuangan_serapan
          (rincian_id, realisasi_keuangan_id, realisasi, dd, mm, yy, createBy, createAt)
          VALUES (
            ${data.id},
            ${data.realisasi_keuangan_id},
            ${data.serapan},
            ${dd},
            ${mm},
            ${yy},
            '${req.user._id}',
            NOW()
          )
        `
      
        db.query(insert, (err) => {
          if (err) {
            console.log("Gagal injeksi data ke-" + index)
            console.log(err)
          }
            else {
                console.log("SUkses injeksi data : -"+index);
            }
        })
      });
      
   



    res.send("OK")




});

router.post('/editData', (req,res)=>{

    console.log(req.body);
    
    console.log('FILE KOSOOONG');
    var query = `
        UPDATE realisasi_keuangan_serapan SET
        realisasi = `+req.body.realisasi+`,
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


    // console.log("===============================")
    // console.log(req.body)
    // console.log("===============================")

    // var file = req.body.file_old
    // hapus_file(file);

    var query = `
        DELETE FROM realisasi_keuangan_serapan WHERE id = '`+req.body.id+`'; 
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



router.post('/viewByRincianKegiatan',upload.single("file"), (req,res)=>{
    console.log(req.body);

    var query = `
        SELECT 
        realisasi_keuangan_serapan.id as realisasi_keuangan_serapan_id,
        realisasi_keuangan_serapan.dd as realisasi_keuangan_serapan_dd,
        realisasi_keuangan_serapan.mm as realisasi_keuangan_serapan_mm,
        realisasi_keuangan_serapan.yy as realisasi_keuangan_serapan_yy,
        realisasi_keuangan_serapan.realisasi as realisasi_keuangan_serapan_realisasi,

        realisasi_keuangan.tgl as realisasi_keuangan_tgl,
        realisasi_keuangan.no as realisasi_keuangan_no,
        realisasi_keuangan.uraian as realisasi_keuangan_uraian,
        realisasi_keuangan.realisasi as realisasi_keuangan_realisasi,
        realisasi_keuangan.keterangan as realisasi_keuangan_keterangan,

        master_permintaan.jenis_permintaan as master_permintaan_uraian

        FROM monev_pembangunan.realisasi_keuangan_serapan realisasi_keuangan_serapan

        LEFT JOIN monev_pembangunan.realisasi_keuangan realisasi_keuangan
        ON realisasi_keuangan.id = realisasi_keuangan_serapan.realisasi_keuangan_id

        LEFT JOIN trista_monev.master_permintaan master_permintaan
        ON master_permintaan.id = realisasi_keuangan.master_permintaan

        WHERE realisasi_keuangan_serapan.rincian_id = `+req.body.rincian_id+`
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
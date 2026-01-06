const express = require('express');
var db = require('../../../../db/MySql/umum');
const router = express.Router();

const fs = require('fs');

var upload = require('../../../../db/multer/pdf');



router.post('/getOne', async(req, res) => {
    console.log(req.body)

    var listData = await getOne(req, res)

    if (listData.length <= 0) {
        res.send([{
            jan : 0,
            feb : 0,
            mar : 0,
            apr : 0,
            mei : 0,
            jun : 0,
            jul : 0,
            agu : 0,
            sep : 0,
            okt : 0,
            nov : 0,
            des : 0,
            thn : 0,
        }])
    } else {
        res.send(listData)
    }
    
});





router.post('/view', (req, res) => {
    // console.log(req.body);
    var data_batas = parseInt(req.body.page_limit);
    var data_star = (req.body.data_ke - 1) * data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    let jml_data = ` 
        SELECT 
        realisasi_keuangan.id

        FROM monev_pembangunan.realisasi_keuangan realisasi_keuangan

        LEFT JOIN trista_monev.master_permintaan master_permintaan
        ON master_permintaan.id = realisasi_keuangan.master_permintaan
        

        WHERE
        (realisasi_keuangan.unit_kerja = '`+req.body.unit_kerja+`'
        AND realisasi_keuangan.yy = `+req.body.tahun+`)
    `;

    let view = `
        SELECT 
        realisasi_keuangan.*,
        master_permintaan.jenis_permintaan  as master_permintaan_uraian

        FROM monev_pembangunan.realisasi_keuangan realisasi_keuangan

        LEFT JOIN trista_monev.master_permintaan master_permintaan
        ON master_permintaan.id = realisasi_keuangan.master_permintaan

        WHERE
        (realisasi_keuangan.unit_kerja = '`+req.body.unit_kerja+`'
        AND realisasi_keuangan.yy = `+req.body.tahun+`)


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
    console.log(req.body);
    let insert = `
    INSERT INTO realisasi_keuangan (master_permintaan, no, uraian, realisasi, unit_kerja, tgl, keterangan, dd, mm, yy, type, createBy, createAt, file)
        VALUES (
            `+req.body.master_permintaan+`,
            '`+req.body.no+`',
            '`+req.body.uraian+`',
            `+req.body.realisasi+`,
            '`+req.body.unit_kerja+`',
            '`+req.body.tgl+`',
            '`+req.body.keterangan+`',
            `+req.body.dd+`,
            `+req.body.mm+`,
            `+req.body.yy+`,
            '`+req.file.mimetype+`',
            '`+req.user._id+`',
            NOW(),
            '`+req.file.filename+`'
        )
    `

    db.query(insert, (err, row) => {
        if (err) {
            console.log('errrrooorrr');
            console.log(err);
            res.send(err);
        } else {
            console.log("sukses");
            // console.log(row);
            res.send(row);
        }
    })
    console.log(req.body);
});


router.post('/editData',upload.single("file"), (req,res)=>{

    console.log(req.body);

    var query = '';
    if (req.file == undefined) {
        console.log('FILE KOSOOONG');
        query = `
        UPDATE realisasi_keuangan SET
            master_permintaan = `+req.body.master_permintaan+`,
            no = '`+req.body.no+`',
            uraian = '`+req.body.uraian+`',
            realisasi = `+req.body.realisasi+`,
            tgl = '`+req.body.tgl+`',
            keterangan = '`+req.body.keterangan+`',
            dd = `+req.body.dd+`,
            mm = `+req.body.mm+`,
            yy = `+req.body.yy+`,
            editeBy    = '`+req.user._id+`',
            editeAt    = NOW()

        WHERE id = '`+req.body.id+`'

        `;
    } else {

        console.log('FILE ADAAA');
        query = `
        UPDATE realisasi_keuangan SET
        master_permintaan = `+req.body.master_permintaan+`,
        no = '`+req.body.no+`',
        uraian = '`+req.body.uraian+`',
        realisasi = `+req.body.realisasi+`,
        tgl = '`+req.body.tgl+`',
        keterangan = '`+req.body.keterangan+`',
        dd = `+req.body.dd+`,
        mm = `+req.body.mm+`,
        yy = `+req.body.yy+`,
        editeBy    = '`+req.user._id+`',
        editeAt    = NOW(),
        file = '`+req.file.filename+`',
        type = '`+req.file.mimetype+`'

        WHERE id = '`+req.body.id+`'
        `;
        
        hapus_file(req.body.file_old);
        // console.log("================================")
        // console.log(req.body.file_old);
        // console.log("================================")
    }







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
    var file = req.body.file_old
    hapus_file(file);

    var query = `
        DELETE FROM realisasi_keuangan WHERE id = '`+req.body.id+`'; 
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
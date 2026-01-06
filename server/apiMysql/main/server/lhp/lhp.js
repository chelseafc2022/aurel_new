const express = require('express');
var db = require('../../../../db/MySql/umum');
var dbx = require('../../../../db/MySql/simpeg');
const router = express.Router();

const fs = require('fs');


var upload = require('../../../../db/multer/all');



router.post('/view', (req, res) => {
    var data_batas = parseInt(req.body.page_limit);
    var data_star = (req.body.data_ke - 1) * data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    let jml_data = `
        SELECT * FROM spt ORDER BY createdAt DESC
    `

    let view = `
        SELECT 
        spt.*,
        spt_pelaksana.nip,
        biodata.gelar_belakang as biodata_gelar_belakang,
        biodata.gelar_depan as biodata_gelar_depan,
        biodata.nama as biodata_nama


        FROM monev_pembangunan.spt spt
        JOIN (
            SELECT spt_pelaksana.*
            FROM monev_pembangunan.spt_pelaksana spt_pelaksana
            WHERE 
            spt_pelaksana.master_spt_jabatan = 1
        ) spt_pelaksana
        ON spt_pelaksana.spt_id = spt.id



        JOIN simpeg.biodata biodata
        ON biodata.nip = spt_pelaksana.nip
        



        WHERE 
        uraian LIKE '%`+cari+`%' 
        ORDER BY createdAt DESC
        LIMIT `+data_star+`,`+data_batas+`
    `;
    db.query(jml_data, (err, row)=>{
        if (err) {
            console.log(err);
            res.json(err)
        }else{
            halaman = Math.ceil(row.length/data_batas);
            if(halaman<1){halaman = 1}
            // ========================
            db.query(view, (err1, result)=>{
                if (err1) {
                    console.log(err1);
                    res.json(err1)
                }
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




router.post('/dataView', (req, res) => {
    console.log(req.body);
    let query = `
        SELECT * FROM `+req.body.db+`
        WHERE spt_id = `+req.body.spt_id+`
    `

    // console.log(insert);

    db.query(query, async (err, row) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(row);
        }
    })
});


// ============================= HAMBATAN =============================

router.post('/addDataHambatan', (req, res) => {
    console.log(req.body);
    let insert = `
        INSERT INTO spt_lhp_hambatan (spt_id, uraian, createdBy, createdAt)
        VALUES (
            `+req.body.spt_id+`,
            '`+req.body.uraian+`',
            '`+req.user._id+`',
            NOW()
        )
    `

    // console.log(insert);

    db.query(insert, async (err, row) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(row);
        }
    })
});

router.post('/editDataHambatan', (req,res)=>{
    var query = `
        UPDATE spt_lhp_hambatan SET
        spt_id = `+req.body.spt_id+`,
        uraian = '`+req.body.uraian+`',
        editedBy    = '`+req.user._id+`',
        editedAt    = NOW()
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

router.post('/removeDataHambatan', (req, res)=> {
    var query = `
        DELETE FROM spt_lhp_hambatan WHERE id = `+req.body.id+`;
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
});
// ============================= HAMBATAN =============================


// ============================= SOLUSI =============================

router.post('/addDataSolusi', (req, res) => {
    console.log(req.body);
    let insert = `
        INSERT INTO spt_lhp_solusi (spt_id, uraian, createdBy, createdAt)
        VALUES (
            `+req.body.spt_id+`,
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
            res.send(row);
        }
    })
});

router.post('/editDataSolusi', (req,res)=>{
    var query = `
        UPDATE spt_lhp_solusi SET
        spt_id = `+req.body.spt_id+`,
        uraian = '`+req.body.uraian+`',
        editedBy    = '`+req.user._id+`',
        editedAt    = NOW()
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

router.post('/removeDataSolusi', (req, res)=> {
    var query = `
        DELETE FROM spt_lhp_solusi WHERE id = `+req.body.id+`;
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
});
// ============================= SOLUSI =============================


// ============================= KESIMPULAN =============================

router.post('/addDataKesimpulan', (req, res) => {
    console.log(req.body);
    let insert = `
        INSERT INTO spt_lhp_kesimpulan (spt_id, uraian, createdBy, createdAt)
        VALUES (
            `+req.body.spt_id+`,
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
            res.send(row);
        }
    })
});

router.post('/editDataKesimpulan', (req,res)=>{
    var query = `
        UPDATE spt_lhp_kesimpulan SET
        spt_id = `+req.body.spt_id+`,
        uraian = '`+req.body.uraian+`',
        editedBy    = '`+req.user._id+`',
        editedAt    = NOW()
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

router.post('/removeDataKesimpulan', (req, res)=> {
    var query = `
        DELETE FROM spt_lhp_kesimpulan WHERE id = `+req.body.id+`;
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
});
// ============================= KESIMPULAN =============================



// ============================= DOKUMENTASI =============================


router.post('/dataViewDokumentasi', (req, res) => {





    console.log(req.body);
    let query = `
        SELECT * FROM spt_lhp_dokumentasi
        WHERE spt_id = `+req.body.spt_id+` AND pembangunan_list_id = `+req.body.pembangunan_list_id+`
    `

    // console.log(insert);

    db.query(query, async (err, row) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(row);
        }
    })
});


router.post('/addDataDokumentasi', upload.array('files'), async (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded!' });
    }

    filex = req.files

    for (let i = 0; i < filex.length; i++) {
        await insertFile(req, filex[i].filename, filex[i].mimetype)
    }


  
    res.json({
      message: 'Files uploaded successfully!',
      files: req.files,
    });
});

router.post('/removeDataDokumentasi', (req, res)=> {
    var query = `
        DELETE FROM spt_lhp_dokumentasi WHERE id = `+req.body.id+`;
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            hapus_file(req.body.fileOld)
            res.send(row);
        }
    });
});

function insertFile(req, file, mimetype){

    return new Promise((resolve, reject) => {



        let insert = `
            INSERT INTO spt_lhp_dokumentasi (spt_id, pembangunan_list_id, uraian, progres, keterangan, file, mimetype, createdBy, createdAt)
            VALUES (
                `+req.body.spt_id+`,
                `+req.body.pembangunan_list_id+`,
                '`+req.body.uraian+`',
                `+req.body.progres+`,
                '`+req.body.keterangan+`',
                '`+file+`',
                '`+mimetype+`',
                '`+req.user._id+`',
                NOW()
            )
        `

        // console.log(insert);

        db.query(insert, (err, row) => {
            if (err) {
                console.log(err);
                resolve(err);
            } else {
                resolve(row);
            }
        })




        






    })


}







// ============================= DOKUMENTASI =============================




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
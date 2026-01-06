const express = require('express');
var db = require('../../../../db/MySql/umum');
const router = express.Router();


router.post('/list', (req, res) => {
    console.log(req.body)

    

    let view = ` 
        SELECT 
        master_kegiatan_sub.*
        FROM master_kegiatan_sub
        WHERE master_kegiatan_sub.kegiatan_kode = '`+req.body.kegiatan_kode+`'
    `;
    db.query(view, (err, row)=>{
        if (err) {
            console.log(err);
            res.json(err)
        }else{
            res.json(row)
        }
    })
});

router.post('/view', (req, res) => {
    var data_batas = parseInt(req.body.page_limit);
    var data_star = (req.body.data_ke - 1) * data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    // console.log(req.body);


    var filter_urusan = ''
    if (req.body.urusan_kode == null || req.body.urusan_kode == undefined || req.body.urusan_kode == '') {
        filter_urusan = ''
    }else{

        if (req.body.urusan_bidang_kode == null || req.body.urusan_bidang_kode == undefined || req.body.urusan_bidang_kode == '') {
            filter_urusan = `AND master_program.urusan_kode = '`+req.body.urusan_kode+`'`
        } else {
            if (req.body.program_kode == null || req.body.program_kode == undefined || req.body.program_kode == ''){
                filter_urusan = `
                    AND (
                        master_program.urusan_kode = '`+req.body.urusan_kode+`'
                        AND master_program.urusan_bidang_kode = '`+req.body.urusan_bidang_kode+`'
                    )
                
                `
                
            } else {

                filter_urusan = `
                AND (
                        master_program.urusan_kode = '`+req.body.urusan_kode+`'
                        AND master_program.urusan_bidang_kode = '`+req.body.urusan_bidang_kode+`'
                    ) AND (master_kegiatan.program_kode = '`+req.body.program_kode+`')
                
                `
                
            }


        }


    }


    let jml_data = ` 
    SELECT 
    master_kegiatan.id

    FROM master_kegiatan

    LEFT JOIN master_program
    ON master_program.kode_full = master_kegiatan.program_kode

    LEFT JOIN urusan_bidang
    ON urusan_bidang.kode_full = master_program.urusan_bidang_kode

    LEFT JOIN urusan
    ON urusan.kode_full = master_program.urusan_kode

    WHERE master_kegiatan.uraian LIKE '%`+cari+`%'
    `+filter_urusan+`
        
    `;

    let view = `
        SELECT 
        master_kegiatan.*,
        master_program.uraian as program_uraian,
        urusan_bidang.uraian as urusan_bidang_uraian,
        urusan_bidang.kode_full as urusan_bidang_kode,
        urusan.uraian as urusan_uraian,
        urusan.kode as urusan_kode

        FROM master_kegiatan

        LEFT JOIN master_program
        ON master_program.kode_full = master_kegiatan.program_kode

        LEFT JOIN urusan_bidang
        ON urusan_bidang.kode_full = master_program.urusan_bidang_kode

        LEFT JOIN urusan
        ON urusan.kode_full = master_program.urusan_kode

        WHERE master_kegiatan.uraian LIKE '%`+cari+`%'
        `+filter_urusan+`
        
        LIMIT `+data_star+`,`+data_batas+`
    `;

    db.query(jml_data, (err, row) => {
        if (err) {
            console.log(err);
            res.json(err)
        } else {
            halaman = Math.ceil(row.length / data_batas);
            if (halaman < 1) { halaman = 1 }
            db.query(view, async (err, result) => {
                if (err) { res.json(err) }
                else {





                    for (let i = 0; i < result.length; i++) {
                        console.log(result[i].kode_full);

                        result[i].sub_kegiatan = await getSubKegiatan(result[i].kode_full)
                        // console.log(i);
                        // await getSubKegiatan(result[i].kode_full)
                        
                        
                    }






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



const getSubKegiatan = async (kegiatan_kode)=>{
    return new Promise((resolve, reject) => {
        
        let insert = `
            SELECT master_kegiatan_sub.*
            FROM master_kegiatan_sub
            WHERE master_kegiatan_sub.kegiatan_kode = '`+kegiatan_kode+`'
        `


        db.query(insert, (err, row) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(row);
                resolve(row)
            }

        })




    })
}


router.post('/addData', (req, res) => {
    console.log(req.body);
    let insert = `
        INSERT INTO master_kegiatan_sub (kegiatan_kode, kode, kode_full, uraian, keterangan, createBy, createAt)
        VALUES (
            '`+req.body.kegiatan_kode+`',
            '`+req.body.kode+`',
            '`+req.body.kegiatan_kode+'.'+req.body.kode+`',
            '`+req.body.uraian+`',
            '`+req.body.keterangan+`',
            '`+req.user._id+`',
            NOW()
        )
    `

    db.query(insert, (err, row) => {
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
        UPDATE master_kegiatan_sub SET
        kegiatan_kode = '`+req.body.kegiatan_kode+`',
        kode = '`+req.body.kode+`',
        kode_full = '`+req.body.kegiatan_kode+'.'+req.body.kode+`',
        uraian     = '`+req.body.uraian+`',
        keterangan = '`+req.body.keterangan+`',
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
    var query = `
        DELETE FROM master_kegiatan_sub WHERE id = '`+req.body.id+`';
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
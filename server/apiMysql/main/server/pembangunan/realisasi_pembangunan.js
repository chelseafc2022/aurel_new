const express = require('express');
var db = require('../../../../db/MySql/umum');
const router = express.Router();

let db_monev_pembangunan = process.env.DB_NAME_UMUM
let db_simpeg = process.env.DB_NAME_SIMPEG


router.get('/list', (req, res) => {
    
    var view = `
    SELECT 
    rup_final.*,
    pembangunan_list.kegiatan_sub_kode,
    pembangunan_list.kegiatan_sub_rincian,
    master_kegiatan_sub.uraian as kegiatan_sub_uraian,
    master_kegiatan.uraian as kegiatan_uraian,
    master_kegiatan.kode_full as kegiatan_kode,
    pembangunan_list.unit_kerja,

    FROM monev_pembangunan.pembangunan_list pembangunan_list

    JOIN ukpbj_doc.rup_final rup_final
    ON rup_final.kd_rup = pembangunan_list.kd_rup

    JOIN monev_pembangunan.master_kegiatan_sub master_kegiatan_sub
    ON master_kegiatan_sub.kode_full = pembangunan_list.kegiatan_sub_kode

    JOIN monev_pembangunan.master_kegiatan master_kegiatan
    ON master_kegiatan.kode_full = master_kegiatan_sub.kegiatan_kode


    WHERE pembangunan_list.unit_kerja = 'CqAcYavXFncBe88WG'

    
    
    `
        
    
    db.query(view, (err, row)=>{
        if (err) {
            console.log(err);
            res.json(err)
        }else{
            res.json(row)
        }
    })
});

router.post('/list', (req, res) => {
    
    var view = `
    SELECT 
    rup_final.*,
    pembangunan_list.kegiatan_sub_kode,
    pembangunan_list.kegiatan_sub_rincian,
    master_kegiatan_sub.uraian as kegiatan_sub_uraian,
    master_kegiatan.uraian as kegiatan_uraian,
    master_kegiatan.kode_full as kegiatan_kode,
    pembangunan_list.unit_kerja


    FROM monev_pembangunan.pembangunan_list pembangunan_list

    JOIN ukpbj_doc.rup_final rup_final
    ON rup_final.kd_rup = pembangunan_list.kd_rup

    JOIN monev_pembangunan.master_kegiatan_sub master_kegiatan_sub
    ON master_kegiatan_sub.kode_full = pembangunan_list.kegiatan_sub_kode

    JOIN monev_pembangunan.master_kegiatan master_kegiatan
    ON master_kegiatan.kode_full = master_kegiatan_sub.kegiatan_kode


    WHERE pembangunan_list.unit_kerja = 'CqAcYavXFncBe88WG'
    AND pembangunan_list.tahun = 2024
    
    
    `
        
    
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

    console.log(req.body);


    var filter_urusan = ''
    if (req.body.urusan_kode == null || req.body.urusan_kode == undefined || req.body.urusan_kode == '') {
        filter_urusan = ''
    }else{

        if (req.body.urusan_bidang_kode == null || req.body.urusan_bidang_kode == undefined || req.body.urusan_bidang_kode == '') {
            filter_urusan = `AND master_program.urusan_kode = '`+req.body.urusan_kode+`'`
        } else {
            filter_urusan = `
            AND (
                    master_program.urusan_kode = '`+req.body.urusan_kode+`'
                    AND master_program.urusan_bidang_kode = '`+req.body.urusan_bidang_kode+`'
                )
            
            `
        }


    }

    let jml_data = ` 
    SELECT 
    master_program.id

    FROM `+db_monev_pembangunan+`.master_program master_program

    LEFT JOIN `+db_monev_pembangunan+`.urusan_bidang urusan_bidang
    ON urusan_bidang.kode_full = master_program.urusan_bidang_kode

    LEFT JOIN `+db_monev_pembangunan+`.urusan urusan
        ON urusan.kode_full = urusan_bidang.urusan_kode

        JOIN `+db_monev_pembangunan+`.program program
        ON program.program_kode = master_program.kode_full

        LEFT JOIN `+db_simpeg+`.unit_kerja unit_kerja
        ON unit_kerja.id = program.unit_kerja

        WHERE master_program.uraian LIKE '%`+cari+`%'
        `+filter_urusan+`
        
    `;

    let view = `
        SELECT 
        master_program.*,
        program.tahun,
        program.id as program_id,
        urusan_bidang.uraian as urusan_bidang_uraian,
        urusan_bidang.kode_full as urusan_bidang_kode,
        urusan.uraian as urusan_uraian,
        urusan.kode as urusan_kode,
        unit_kerja.unit_kerja as unit_kerja_uraian

        FROM `+db_monev_pembangunan+`.master_program master_program

        LEFT JOIN `+db_monev_pembangunan+`.urusan_bidang urusan_bidang
        ON urusan_bidang.kode_full = master_program.urusan_bidang_kode

        LEFT JOIN `+db_monev_pembangunan+`.urusan urusan
        ON urusan.kode_full = urusan_bidang.urusan_kode

        JOIN `+db_monev_pembangunan+`.program program
        ON program.program_kode = master_program.kode_full

        LEFT JOIN `+db_simpeg+`.unit_kerja unit_kerja
        ON unit_kerja.id = program.unit_kerja

        WHERE master_program.uraian LIKE '%`+cari+`%'
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
            db.query(view, (err, result) => {
                if (err) { res.json(err) }
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

router.post('/addData', (req, res) => {
    // console.log(req.body);
    let insert = `
        INSERT INTO program (program_kode , unit_kerja ,tahun, createBy, createAt)
        VALUES (
            '`+req.body.program_kode+`',
            '`+req.body.unit_kerja+`',
            `+req.body.tahun+`,
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
    // console.log(req.body);
});

router.post('/editData', (req,res)=>{
    var query = `
        UPDATE program SET
        program_kode = '`+req.body.urusan_kode+`',
        tahun = `+req.body.tahun+`,
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

    console.log(req.body);
    var query = `
        DELETE FROM program WHERE id = `+req.body.program_id+`;
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
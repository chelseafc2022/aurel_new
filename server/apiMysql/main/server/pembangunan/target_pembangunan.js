const express = require('express');
var db = require('../../../../db/MySql/umum');
var dbx = require('../../../../db/MySql/ukpbj_doc');
const router = express.Router();

let db_monev_pembangunan = process.env.DB_NAME_UMUM
let db_simpeg = process.env.DB_NAME_SIMPEG




router.post('/view', (req, res) => {
    var data_batas = parseInt(req.body.page_limit);
    var data_star = (req.body.data_ke - 1) * data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    // console.log(req.body);


   

    let jml_data = ` 

        SELECT 
        pembangunan_list.kegiatan_sub_kode,
        pembangunan_list.kegiatan_sub_rincian,
        master_kegiatan_sub.uraian as kegiatan_sub_uraian,
        master_kegiatan.uraian as kegiatan_uraian,
        master_kegiatan.kode_full as kegiatan_kode,
        pembangunan_list.unit_kerja,


        rup_final.*

        FROM monev_pembangunan.pembangunan_list pembangunan_list

        JOIN ukpbj_doc.rup_final rup_final
        ON rup_final.kd_rup = pembangunan_list.kd_rup

        JOIN monev_pembangunan.master_kegiatan_sub master_kegiatan_sub
        ON master_kegiatan_sub.kode_full = pembangunan_list.kegiatan_sub_kode

        JOIN monev_pembangunan.master_kegiatan master_kegiatan
        ON master_kegiatan.kode_full = master_kegiatan_sub.kegiatan_kode

        WHERE rup_final.nama_paket LIKE '%`+cari+`%'
        AND (pembangunan_list.unit_kerja = '`+req.body.unit_kerja+`'
        AND pembangunan_list.tahun = `+req.body.tahun+`)

        
    `;

    let view = `
        SELECT 
        pembangunan_list.id as pembangunan_list_id,
        pembangunan_list.kegiatan_sub_kode,
        pembangunan_list.kegiatan_sub_rincian,
        master_kegiatan_sub.uraian as kegiatan_sub_uraian,
        master_kegiatan.uraian as kegiatan_uraian,
        master_kegiatan.kode_full as kegiatan_kode,
        pembangunan_list.unit_kerja,
        kegiatan_sub_rincian.uraian as kegiatan_sub_rincian_uraian,

        IFNULL(
            null, 
            target_fisik.jan +
            target_fisik.feb +
            target_fisik.mar +
            target_fisik.apr +
            target_fisik.mei +
            target_fisik.jun +
            target_fisik.jul +
            target_fisik.agu +
            target_fisik.sep +
            target_fisik.okt +
            target_fisik.nov +
            target_fisik.des
        ) as jml_target_fisik ,

        (
            SELECT COUNT(target_fisik.id) 
            FROM monev_pembangunan.target_fisik target_fisik
            WHERE (
                target_fisik.rincian_id = pembangunan_list.kegiatan_sub_rincian OR
                target_fisik.pembangunan_list_id = pembangunan_list.id
            )
        ) as jml_target,

        ( SELECT SUM(realisasi_fisik.realisasi) 
            FROM monev_pembangunan.realisasi_fisik realisasi_fisik
            WHERE (
                realisasi_fisik.rincian_id = pembangunan_list.kegiatan_sub_rincian OR
                realisasi_fisik.pembangunan_list_id = pembangunan_list.id
            )
        ) as total_jml_realisasi_fisik,


        rup_final.*

        FROM monev_pembangunan.pembangunan_list pembangunan_list

        LEFT JOIN monev_pembangunan.target_fisik target_fisik
        ON (target_fisik.rincian_id = pembangunan_list.kegiatan_sub_rincian OR
            target_fisik.pembangunan_list_id = pembangunan_list.id)
        
        LEFT JOIN monev_pembangunan.kegiatan_sub_rincian kegiatan_sub_rincian
        ON kegiatan_sub_rincian.id = pembangunan_list.kegiatan_sub_rincian


        JOIN ukpbj_doc.rup_final rup_final
        ON rup_final.kd_rup = pembangunan_list.kd_rup

        JOIN monev_pembangunan.master_kegiatan_sub master_kegiatan_sub
        ON master_kegiatan_sub.kode_full = pembangunan_list.kegiatan_sub_kode

        JOIN monev_pembangunan.master_kegiatan master_kegiatan
        ON master_kegiatan.kode_full = master_kegiatan_sub.kegiatan_kode

        WHERE rup_final.nama_paket LIKE '%`+cari+`%'
        AND (pembangunan_list.unit_kerja = '`+req.body.unit_kerja+`'
        AND pembangunan_list.tahun = `+req.body.tahun+`)
        
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

router.get('/list', (req, res)=> {

    console.log(req.body);
    var query = `
        SELECT 
        pembangunan_list.kegiatan_sub_kode,
        pembangunan_list.kegiatan_sub_rincian,
        master_kegiatan_sub.uraian as kegiatan_sub_uraian,
        master_kegiatan.uraian as kegiatan_uraian,
        master_kegiatan.kode_full as kegiatan_kode,
        pembangunan_list.unit_kerja,


        rup_final.*

        FROM monev_pembangunan.pembangunan_list pembangunan_list

        JOIN ukpbj_doc.rup_final rup_final
        ON rup_final.kd_rup = pembangunan_list.kd_rup

        JOIN monev_pembangunan.master_kegiatan_sub master_kegiatan_sub
        ON master_kegiatan_sub.kode_full = pembangunan_list.kegiatan_sub_kode

        JOIN monev_pembangunan.master_kegiatan master_kegiatan
        ON master_kegiatan.kode_full = master_kegiatan_sub.kegiatan_kode

    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
});


// UNTUK LAPORAN
router.post('/list', (req, res)=> {

    var data_batas = parseInt(req.body.page_limit);
    var data_star = (req.body.data_ke - 1) * data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    console.log(req.body);
    var query = `
        SELECT 
        pembangunan_list.id as pembangunan_list_id,
        pembangunan_list.kegiatan_sub_kode,
        pembangunan_list.kegiatan_sub_rincian,
        master_kegiatan_sub.uraian as kegiatan_sub_uraian,
        master_kegiatan.uraian as kegiatan_uraian,
        master_kegiatan.kode_full as kegiatan_kode,
        pembangunan_list.unit_kerja,
        kegiatan_sub_rincian.uraian as kegiatan_sub_rincian_uraian,

        IFNULL(
            null, 
            target_fisik.mar +
            target_fisik.apr +
            target_fisik.mei
        ) as jml_target_fisik ,

        (
            SELECT COUNT(target_fisik.id) 
            FROM monev_pembangunan.target_fisik target_fisik
            WHERE target_fisik.rincian_id = pembangunan_list.kegiatan_sub_rincian
        ) as jml_target,

        ( SELECT SUM(realisasi_fisik.realisasi) 
            FROM monev_pembangunan.realisasi_fisik realisasi_fisik
            WHERE realisasi_fisik.rincian_id = pembangunan_list.kegiatan_sub_rincian
        ) as total_jml_realisasi_fisik,

        ( SELECT SUM(realisasi_keuangan_serapan.realisasi) 
            FROM monev_pembangunan.realisasi_keuangan_serapan realisasi_keuangan_serapan
            WHERE realisasi_keuangan_serapan.rincian_id = pembangunan_list.kegiatan_sub_rincian
        ) as total_jml_realisasi_keuangan,




        rup_final.*

        FROM monev_pembangunan.pembangunan_list pembangunan_list

        LEFT JOIN monev_pembangunan.target_fisik target_fisik
        ON target_fisik.rincian_id = pembangunan_list.kegiatan_sub_rincian
        
        LEFT JOIN monev_pembangunan.kegiatan_sub_rincian kegiatan_sub_rincian
        ON kegiatan_sub_rincian.id = pembangunan_list.kegiatan_sub_rincian


        JOIN ukpbj_doc.rup_final rup_final
        ON rup_final.kd_rup = pembangunan_list.kd_rup

        JOIN monev_pembangunan.master_kegiatan_sub master_kegiatan_sub
        ON master_kegiatan_sub.kode_full = pembangunan_list.kegiatan_sub_kode

        JOIN monev_pembangunan.master_kegiatan master_kegiatan
        ON master_kegiatan.kode_full = master_kegiatan_sub.kegiatan_kode

        WHERE rup_final.nama_paket LIKE '%`+cari+`%'
        AND (pembangunan_list.unit_kerja = '`+req.body.unit_kerja+`'
        AND pembangunan_list.tahun = `+req.body.tahun+`)

    `;
    db.query(query, (err, row)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(row);
        }
    });
});


// UNTUK LIST DARI MOBILE
router.post('/list_mobile', (req, res)=> {

    var data_batas = parseInt(req.body.page_limit);
    var cari = req.body.cari_value;
    var userx = req.user.profile



    var filter_unit = ''

    if (req.body.unit_kerja == null || req.body.unit_kerja == undefined || req.body.unit_kerja == "") {
        filter_unit = `AND (pembangunan_list.unit_kerja = '`+userx.unit_kerja+`'`
    } else {
        filter_unit = `AND (pembangunan_list.unit_kerja = '`+req.body.unit_kerja+`'`
    }

    var tahun1 = new Date().getFullYear();
    var tahunx = tahun1-1;
    var filter_tahun = '';


    if (req.body.tahun == null || req.body.tahun == undefined || req.body.tahun == "") {
        filter_tahun = `AND pembangunan_list.tahun = `+tahunx+`)`
    } else {
        filter_tahun = `AND pembangunan_list.tahun = `+req.body.tahun+`)`
    }


    console.log(req.body);
    console.log(tahunx);
    var query = `
        SELECT 
        pembangunan_list.id as pembangunan_list_id,
        pembangunan_list.kegiatan_sub_kode,
        pembangunan_list.kegiatan_sub_rincian,
        master_kegiatan_sub.uraian as kegiatan_sub_uraian,
        master_kegiatan.uraian as kegiatan_uraian,
        master_kegiatan.kode_full as kegiatan_kode,
        pembangunan_list.unit_kerja,
        kegiatan_sub_rincian.uraian as kegiatan_sub_rincian_uraian,

        IFNULL(
            null, 
            target_fisik.mar +
            target_fisik.apr +
            target_fisik.mei
        ) as jml_target_fisik ,

        (
            SELECT COUNT(target_fisik.id) 
            FROM monev_pembangunan.target_fisik target_fisik
            WHERE target_fisik.rincian_id = pembangunan_list.kegiatan_sub_rincian
        ) as jml_target,

        ( SELECT SUM(realisasi_fisik.realisasi) 
            FROM monev_pembangunan.realisasi_fisik realisasi_fisik
            WHERE realisasi_fisik.rincian_id = pembangunan_list.kegiatan_sub_rincian
        ) as total_jml_realisasi_fisik,

        ( SELECT SUM(realisasi_keuangan_serapan.realisasi) 
            FROM monev_pembangunan.realisasi_keuangan_serapan realisasi_keuangan_serapan
            WHERE realisasi_keuangan_serapan.rincian_id = pembangunan_list.kegiatan_sub_rincian
        ) as total_jml_realisasi_keuangan,




        rup_final.*

        FROM monev_pembangunan.pembangunan_list pembangunan_list

        LEFT JOIN monev_pembangunan.target_fisik target_fisik
        ON target_fisik.rincian_id = pembangunan_list.kegiatan_sub_rincian
        
        LEFT JOIN monev_pembangunan.kegiatan_sub_rincian kegiatan_sub_rincian
        ON kegiatan_sub_rincian.id = pembangunan_list.kegiatan_sub_rincian


        JOIN ukpbj_doc.rup_final rup_final
        ON rup_final.kd_rup = pembangunan_list.kd_rup

        JOIN monev_pembangunan.master_kegiatan_sub master_kegiatan_sub
        ON master_kegiatan_sub.kode_full = pembangunan_list.kegiatan_sub_kode

        JOIN monev_pembangunan.master_kegiatan master_kegiatan
        ON master_kegiatan.kode_full = master_kegiatan_sub.kegiatan_kode

        WHERE rup_final.nama_paket LIKE '%`+cari+`%'
        `+filter_unit+`
        `+filter_tahun+`
       

    `;
    db.query(query, (err, row)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(row);
        }
    });
});

router.post('/viewOne', (req, res)=> {


    console.log(req.body);

    var query = `
        SELECT 
        pembangunan_list.id as pembangunan_list_id,
        pembangunan_list.kegiatan_sub_kode,
        pembangunan_list.kegiatan_sub_rincian,
        master_kegiatan_sub.uraian as kegiatan_sub_uraian,
        master_kegiatan.uraian as kegiatan_uraian,
        master_kegiatan.kode_full as kegiatan_kode,
        pembangunan_list.unit_kerja,
        kegiatan_sub_rincian.uraian as kegiatan_sub_rincian_uraian,

        IFNULL(
            null, 
            target_fisik.mar +
            target_fisik.apr +
            target_fisik.mei
        ) as jml_target_fisik ,

        (
            SELECT COUNT(target_fisik.id) 
            FROM monev_pembangunan.target_fisik target_fisik
            WHERE target_fisik.rincian_id = pembangunan_list.kegiatan_sub_rincian
        ) as jml_target,

        ( SELECT SUM(realisasi_fisik.realisasi) 
            FROM monev_pembangunan.realisasi_fisik realisasi_fisik
            WHERE realisasi_fisik.rincian_id = pembangunan_list.kegiatan_sub_rincian
        ) as total_jml_realisasi_fisik,

        ( SELECT SUM(realisasi_keuangan_serapan.realisasi) 
            FROM monev_pembangunan.realisasi_keuangan_serapan realisasi_keuangan_serapan
            WHERE realisasi_keuangan_serapan.rincian_id = pembangunan_list.kegiatan_sub_rincian
        ) as total_jml_realisasi_keuangan,




        rup_final.*

        FROM monev_pembangunan.pembangunan_list pembangunan_list

        LEFT JOIN monev_pembangunan.target_fisik target_fisik
        ON target_fisik.rincian_id = pembangunan_list.kegiatan_sub_rincian
        
        LEFT JOIN monev_pembangunan.kegiatan_sub_rincian kegiatan_sub_rincian
        ON kegiatan_sub_rincian.id = pembangunan_list.kegiatan_sub_rincian


        JOIN ukpbj_doc.rup_final rup_final
        ON rup_final.kd_rup = pembangunan_list.kd_rup

        JOIN monev_pembangunan.master_kegiatan_sub master_kegiatan_sub
        ON master_kegiatan_sub.kode_full = pembangunan_list.kegiatan_sub_kode

        JOIN monev_pembangunan.master_kegiatan master_kegiatan
        ON master_kegiatan.kode_full = master_kegiatan_sub.kegiatan_kode

        WHERE pembangunan_list.id = `+req.body.id+`
       

    `;
    db.query(query, (err, row)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(row[0]);
        }
    });
});




router.post('/syncRincian', (req,res)=>{


    console.log(req.body)
    // res.send("ok")



    var query = `
        UPDATE pembangunan_list SET
        kegiatan_sub_rincian = '`+req.body.kegiatan_sub_rincian+`'

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

router.get('/sync_ukpbj', async (req, res) => {
    var data = await getAsyncData()

    var dummyx = []



    for (let i = 0; i < data.length; i++) {


        let monev = await checkAsyncData(data[i])
        if (monev == 0) {
            // nah di sini kita insert dulu ke dalam maser program
            await insertAsyncData(data[i], req)
        }

        // let prog_monev = await checkKegiatanSubMonev(data[i])
        // if (prog_monev == 0) {
        //     // nah di sini kita insert dulu ke dalam maser program
        //    await  insertKegiatanSubMonev(data[i], req)
        // }
        
        
        
        
        // dummyx.push(monev)



        
    }




    res.send(dummyx);
    // res.send(data);

});


async function getAsyncData(){

    return new Promise((resolve, reject) => {
        

        var view = `
        
        SELECT
        rup_final.*,
        master_kegiatan_sub.nama_subkegiatan as nama_subkegiatan,
        master_kegiatan_sub.kd_subkegiatan_str as kd_subkegiatan_str,
        master_kegiatan.nama_kegiatan as nama_kegiatan,
        master_kegiatan.kd_kegiatan_str as kd_kegiatan_str,
        master_program.nama_program,

        unit_kerja.id as unit_kerja_id,
        unit_kerja.unit_kerja as unit_kerja


        FROM ukpbj_doc.rup_final rup_final




        LEFT JOIN 
        (
            SELECT fa.*
            FROM ukpbj_doc.rup_draft fa 
            GROUP BY fa.kd_rup
        ) as rup_draft
        
        ON rup_draft.kd_rup = rup_final.kd_rup


        JOIN ukpbj_doc.master_kegiatan_sub master_kegiatan_sub
        ON master_kegiatan_sub.kd_subkegiatan = rup_draft.kd_subkegiatan

        JOIN ukpbj_doc.master_kegiatan master_kegiatan
        ON master_kegiatan.kd_kegiatan = master_kegiatan_sub.kd_kegiatan

        JOIN ukpbj_doc.master_program master_program
        ON master_program.kd_program = master_kegiatan.kd_program





        JOIN ukpbj_doc.master_unit_kerja master_unit_kerja
        ON master_unit_kerja.kd_satker = master_kegiatan.kd_satker

        LEFT JOIN simpeg.unit_kerja unit_kerja
        ON unit_kerja.kode = master_unit_kerja.kd_satker_str

        LEFT JOIN monev_pembangunan.master_unit_kerja monev_master_unit_kerja
        ON monev_master_unit_kerja.unit_kerja_id = unit_kerja.id AND monev_master_unit_kerja.utama = 1






        WHERE 
        
        (rup_final.tahun_anggaran = 2024) AND rup_final.jenis_pengadaan ='Pekerjaan Konstruksi'
   
        
        
        `
        
        dbx.query(view, (err, row)=>{
            if (err) {
                console.log(err);
                resolve(err)
            }else{
                resolve(row)
            }
        })


    })



}

async function getAsyncData1(){

    return new Promise((resolve, reject) => {
        

        var view = `
        SELECT pengumuman_paket.*,
        rup_final.type_kegiatan,
        master_kegiatan_sub.nama_subkegiatan as nama_subkegiatan,
        master_kegiatan_sub.kd_subkegiatan_str as kd_subkegiatan_str,
        master_kegiatan.nama_kegiatan as nama_kegiatan,
        master_kegiatan.kd_kegiatan_str as kd_kegiatan_str,
        master_program.nama_program,
        master_program.kd_program_str as kd_program_str

        FROM ukpbj_doc.pengumuman_paket pengumuman_paket

        LEFT JOIN ukpbj_doc.rup_final rup_final
        ON rup_final.kd_rup = pengumuman_paket.kd_rup

        LEFT JOIN 
        (
            SELECT fa.*
            FROM ukpbj_doc.rup_draft fa 
            GROUP BY fa.kd_rup
        ) as rup_draft
        ON rup_draft.kd_rup = rup_final.kd_rup

        LEFT JOIN ukpbj_doc.master_kegiatan_sub master_kegiatan_sub
        ON master_kegiatan_sub.kd_subkegiatan = rup_draft.kd_subkegiatan

        LEFT JOIN ukpbj_doc.master_kegiatan master_kegiatan
        ON master_kegiatan.kd_kegiatan = master_kegiatan_sub.kd_kegiatan

        LEFT JOIN ukpbj_doc.master_program master_program
        ON master_program.kd_program = master_kegiatan.kd_program


        WHERE 
        
        (pengumuman_paket.tahun_anggaran = 2024) AND pengumuman_paket.jenis_pengadaan ='Pekerjaan Konstruksi'
    
        #LIMIT 10
        
        
        `
        
        dbx.query(view, (err, row)=>{
            if (err) {
                console.log(err);
                resolve(err)
            }else{
                resolve(row)
            }
        })


    })



}


async function checkAsyncData(data){
    return new Promise((resolve, reject) => {
        var query = `
            SELECT 
            COUNT(pembangunan_list.id) as jml
            FROM pembangunan_list
            WHERE 
            kd_rup = '`+data.kd_rup+`' AND
            tahun = `+data.tahun_anggaran+` AND
            unit_kerja = '`+data.unit_kerja_id+`'
        `;

        db.query(query, (err, row)=>{
            if(err) {
                console.log(err);
                res.send(err);
            }else{
                resolve(row[0].jml)
            }
        }) 

        
    })
}

async function insertAsyncData(data, req){
    return new Promise((resolve, reject) => {


        let view = `
            INSERT INTO pembangunan_list (kd_rup, kegiatan_sub_kode, tahun, uraian , unit_kerja , pagu , metode_pemilihan , status_konsolidasi, tipe_paket)
            VALUES (
                '`+data.kd_rup+`',
                '`+data.kd_subkegiatan_str+`',
                `+data.tahun_anggaran+`,
                '`+data.nama_paket+`',
                '`+data.unit_kerja_id+`',
                `+data.pagu+`,
                `+data.kd_metode_pengadaan+`,
                '`+data.status_konsolidasi+`',
                '`+data.tipe_paket+`'
            )
        `
            //'`+req.user._id+`',
        db.query(view, (err, row)=>{
            if (err) {
                console.log(err);
                resolve(err)
            }else{
                // console.log(row[0].jml);
                resolve("OK")
            }
        })
        

        
    })
}










module.exports = router;
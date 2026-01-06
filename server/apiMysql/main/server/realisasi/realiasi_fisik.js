const express = require('express');
var db = require('../../../../db/MySql/umum');
var db_simpeg = require('../../../../db/MySql/simpeg');
const router = express.Router();

var kk_adm = require('../../../library/kertasKerja/kk_adm');
var kk_kontrak = require('../../../library/kertasKerja/kk_kontrak');
var kk_hibah = require('../../../library/kertasKerja/kk_hibah');
var kk_sppd = require('../../../library/kertasKerja/kk_sppd');

// V2 di pakai pada menu pembangunan dan pada mobile_quasar. sementara V1 hanya pada aurel dan diluar itu


router.post('/view', (req, res) => {

    var query = `
        SELECT realisasi_fisik.*
        FROM realisasi_fisik 
        WHERE realisasi_fisik.rincian_id = `+req.body.rincian_id+`;
    `;
    db.query(query, async (err, row)=>{
        if(err){
            console.log(err)
            res.send("ERROR");
        }else{
            
            var data = []
            
            
            for (let i = 0; i < row.length; i++) {
                
                // row[i].detile = []
                
                if (row[i].kk_jenis == 4) { // HIBAH
                    row[i].detile = await kk_hibah.ViewKKHibah(row[i].id, db)
                } else if (row[i].kk_jenis == 3){ // ADM
                    row[i].detile = await kk_adm.ViewKKAdm(row[i].id, db)
                } else if (row[i].kk_jenis == 2){ // SPPD
                    row[i].detile = await kk_sppd.ViewKKSPPD(row[i].id, db)
                } else if (row[i].kk_jenis == 1){ //Kontrak
                    row[i].detile = await kk_kontrak.ViewKKKontrak(row[i].id, db)
                }


            }
            
            res.send(row);



        }
    });
});

router.post('/viewV2', (req, res) => {

    var query = `
        SELECT realisasi_fisik.*
        FROM realisasi_fisik 
        WHERE realisasi_fisik.pembangunan_list_id = `+req.body.pembangunan_list_id+`;
    `;
    db.query(query, async (err, row)=>{
        if(err){
            console.log(err)
            res.send("ERROR");
        }else{
            
            var data = []
            
            
            // for (let i = 0; i < row.length; i++) {
                
            //     // row[i].detile = []
                
            //     if (row[i].kk_jenis == 4) { // HIBAH
            //         row[i].detile = await kk_hibah.ViewKKHibah(row[i].id, db)
            //     } else if (row[i].kk_jenis == 3){ // ADM
            //         row[i].detile = await kk_adm.ViewKKAdm(row[i].id, db)
            //     } else if (row[i].kk_jenis == 2){ // SPPD
            //         row[i].detile = await kk_sppd.ViewKKSPPD(row[i].id, db)
            //     } else if (row[i].kk_jenis == 1){ //Kontrak
            //         row[i].detile = await kk_kontrak.ViewKKKontrak(row[i].id, db)
            //     }


            // }
            
            res.send(row);



        }
    });
});

router.post('/addData', (req, res) => {
    console.log(req.body);
    // console.log("REALISASI FISIK DI PANGGIL")
    // res.send("OK")

    var realisasi = req.body.realisasi


    let insert = `
        INSERT INTO realisasi_fisik (rincian_id, realisasi_keuangan_serapan_id, uraian, realisasi, kk_jenis, dd, mm, yy, tgl, keterangan, createBy, createAt)
        VALUES (
            `+realisasi.rincian_id+`,
            `+realisasi.realisasi_keuangan_serapan_id+`,
            '`+realisasi.uraian+`',
            `+realisasi.realisasi+`,
            `+realisasi.kk_jenis+`,
            `+realisasi.dd+`,
            `+realisasi.mm+`,
            `+realisasi.yy+`,
            '`+realisasi.tgl+`',
            '`+realisasi.keterangan+`',
            '`+req.user._id+`',
            NOW()
        )
    `

    db.query(insert, async (err, row) => {
        if (err) {
            console.log('errrrooorrr');
            console.log(err);
            res.send(err);
        } else {
            // console.log(row);

            if (realisasi.kk_jenis == 1) {
                await kk_kontrak.AddKKKontrak(req, row, db)
                
            } else if (realisasi.kk_jenis == 2){
                await kk_sppd.AddKKSPPD(req, row, db)

            } else if (realisasi.kk_jenis == 3){
                await kk_adm.AddKKAdm(req, row, db)
                
            } else if (realisasi.kk_jenis == 4){
                await kk_hibah.AddKKHibah(req, row, db)
            }
            

            res.send(row);
        }
    })
    
});

router.post('/addDataV2', (req, res) => {
    console.log(req.body);
    // console.log("REALISASI FISIK DI PANGGIL")
    // res.send("OK")

    var realisasi = req.body


    let insert = `
        INSERT INTO realisasi_fisik (pembangunan_list_id, uraian, realisasi, kk_jenis, dd, mm, yy, tgl, keterangan, createBy, createAt)
        VALUES (
            `+realisasi.pembangunan_list_id+`,
            '`+realisasi.uraian+`',
            `+realisasi.realisasi+`,
            `+realisasi.kk_jenis+`,
            `+realisasi.dd+`,
            `+realisasi.mm+`,
            `+realisasi.yy+`,
            '`+realisasi.tgl+`',
            '`+realisasi.keterangan+`',
            '`+req.user._id+`',
            NOW()
        )
    `

    db.query(insert, async (err, row) => {
        if (err) {
            console.log('errrrooorrr');
            console.log(err);
            res.send(err);
        } else {
            // console.log(row);

            // if (realisasi.kk_jenis == 1) {
            //     await kk_kontrak.AddKKKontrak(req, row, db)
                
            // } else if (realisasi.kk_jenis == 2){
            //     await kk_sppd.AddKKSPPD(req, row, db)

            // } else if (realisasi.kk_jenis == 3){
            //     await kk_adm.AddKKAdm(req, row, db)
                
            // } else if (realisasi.kk_jenis == 4){
            //     await kk_hibah.AddKKHibah(req, row, db)
            // }
            

            res.send(row);
        }
    })
    
});

router.post('/editData', (req,res)=>{


    // rincian_id, uraian, realisasi, dd, mm, yy, tgl, keterangan, createBy, createAt

    var realisasi = req.body.realisasi

    var query = `
        UPDATE realisasi_fisik SET
        rincian_id = `+realisasi.rincian_id+`,
        realisasi_keuangan_serapan_id = `+realisasi.realisasi_keuangan_serapan_id+`,
        uraian = '`+realisasi.uraian+`',
        realisasi = `+realisasi.realisasi+`,
        kk_jenis = `+realisasi.kk_jenis+`,
        dd     = `+realisasi.dd+`,
        mm     = `+realisasi.mm+`,
        yy     = `+realisasi.yy+`,
        tgl     = '`+realisasi.tgl+`',
        keterangan = '`+realisasi.keterangan+`',
        editeBy    = '`+req.user._id+`',
        editeAt    = NOW()

        WHERE id = '`+realisasi.id+`' 
    `;

    db.query(query, async (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{


            if (realisasi.kk_jenis == 1) {
                await kk_kontrak.EditKKKontrak(req, row, db)
                
            } else if (realisasi.kk_jenis == 2){
                await kk_sppd.EditKKSPPD(req, row, db)

            } else if (realisasi.kk_jenis == 3){
                await kk_adm.EditKKAdm(req, row, db)
                
            } else if (realisasi.kk_jenis == 4){
                await kk_hibah.EditKKHibah(req, row, db)
                
            }
            res.send(row);
        }
    }) 
});

router.post('/removeData', (req, res)=> {
    console.log(req.body);
    var query = `
        DELETE FROM realisasi_fisik WHERE id = `+req.body.id+`;
    `;
    db.query(query, async (err, row)=>{
        if(err){
            res.send(err);
        }else{
            await kk_adm.removeKKAdm(req, db)
            res.send(row);
        }
    });
});


router.get('/chart1', (req, res) => {
    
        var tahun  = 2024;
        var bulan = 1
        var unit_kerja = ''


        // console.log("===============================")
        // console.log(req.body)
        // console.log("===============================")
    
        // var file = req.body.file_old
        // hapus_file(file);
    
        var query = `
            SELECT 
            COUNT (pembangunan_list.id) as jml_keg,

            (
                SELECT
                SUM (target_fisik.jan) as target_jan


                FROM monev_pembangunan.target_fisik target_fisik
                WHERE target_fisik.pembangunan_list_id = pembangunan_list.id

            ) as ASSU


 
            FROM monev_pembangunan.pembangunan_list pembangunan_list

        `;
        db.query(query, (err, row)=>{
            if(err){
                console.log(err);
                res.send(err);
            }else{
                res.send(row);
            }
        });








    // res.send(
    //     {
    //         data : [30, 70],
    //         unit_kerja_uraian : 'Dinas XXX YYY dari Server',
    //         get realisasi() {
    //             return this.data[0];
    //         },
    //         get blm_realisasi() {
    //             return this.data[1];
    //         },

    //     }
    // )
    
});
router.get('/chart2', (req, res) => {
    
        var tahun  = 2024;
        var bulan = 2
        var unit_kerja = 'zuigCLHL8iRRxDArS'


        // console.log("===============================")
        // console.log(req.body)
        // console.log("===============================")
    
        // var file = req.body.file_old
        // hapus_file(file);
    
        var query = `
            SELECT 
            target_fisik.id,

            @totalPembangunan := (

                SELECT COUNT (pembangunan_list.id) as jml_keg
                FROM monev_pembangunan.pembangunan_list pembangunan_list
                WHERE 
                pembangunan_list.unit_kerja = '`+unit_kerja+`' AND
                pembangunan_list.tahun = `+tahun+`
            ) as jml_pembangunan,


            @totalRerata := @totalPembangunan*100 as total_rerata,


            ROUND(IFNULL (SUM((target_fisik.jan*100)/ @totalRerata), 0), 2) as target_jan,
            ROUND(IFNULL (SUM((target_fisik.feb*100)/ @totalRerata), 0), 2) as target_feb,
            ROUND(IFNULL (SUM((target_fisik.mar*100)/ @totalRerata), 0), 2) as target_mar,
            ROUND(IFNULL (SUM((target_fisik.apr*100)/ @totalRerata), 0), 2) as target_apr,
            ROUND(IFNULL (SUM((target_fisik.mei*100)/ @totalRerata), 0), 2) as target_mei,
            ROUND(IFNULL (SUM((target_fisik.jun*100)/ @totalRerata), 0), 2) as target_jun,
            ROUND(IFNULL (SUM((target_fisik.jul*100)/ @totalRerata), 0), 2) as target_jul,
            ROUND(IFNULL (SUM((target_fisik.agu*100)/ @totalRerata), 0), 2) as target_agu,
            ROUND(IFNULL (SUM((target_fisik.sep*100)/ @totalRerata), 0), 2) as target_sep,
            ROUND(IFNULL (SUM((target_fisik.okt*100)/ @totalRerata), 0), 2) as target_okt,
            ROUND(IFNULL (SUM((target_fisik.nov*100)/ @totalRerata), 0), 2) as target_nov,
            ROUND(IFNULL (SUM((target_fisik.des*100)/ @totalRerata), 0), 2) as target_des,

            @a := (
                SELECT SUM(IFNULL(realisasi_fisik.realisasi,0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                WHERE 
                realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND 
                (realisasi_fisik.mm <= `+bulan+` AND realisasi_fisik.yy = `+tahun+`)
            ) as realisasi








            FROM 
            monev_pembangunan.target_fisik target_fisik
        `;
        db.query(query, (err, row)=>{
            if(err){
                console.log(err);
                res.send(err);
            }else{
                res.send(row);
            }
        });








    // res.send(
    //     {
    //         data : [30, 70],
    //         unit_kerja_uraian : 'Dinas XXX YYY dari Server',
    //         get realisasi() {
    //             return this.data[0];
    //         },
    //         get blm_realisasi() {
    //             return this.data[1];
    //         },

    //     }
    // )
    
});
router.get('/chart3', (req, res) => {
    
        var tahun  = 2024;
        var bulan = 1
        var unit_kerja = 'zuigCLHL8iRRxDArS'


    
        var query = `
            SELECT 
            target_fisik.id,

            @totalPembangunan := (

                SELECT COUNT (pembangunan_list.id) as jml_keg
                FROM monev_pembangunan.pembangunan_list pembangunan_list
                WHERE 
                pembangunan_list.unit_kerja = '`+unit_kerja+`' AND
                pembangunan_list.tahun = `+tahun+`
            ) as jml_pembangunan,


            @totalRerata := @totalPembangunan*100 as total_rerata,


            ROUND(IFNULL (SUM((target_fisik.jan)), 0), 2) as total_target_jan,
            ROUND(IFNULL (SUM((target_fisik.feb)), 0), 2) as total_target_feb,
            ROUND(IFNULL (SUM((target_fisik.mar)), 0), 2) as total_target_mar,
            ROUND(IFNULL (SUM((target_fisik.apr)), 0), 2) as total_target_apr,
            ROUND(IFNULL (SUM((target_fisik.mei)), 0), 2) as total_target_mei,
            ROUND(IFNULL (SUM((target_fisik.jun)), 0), 2) as total_target_jun,
            ROUND(IFNULL (SUM((target_fisik.jul)), 0), 2) as total_target_jul,
            ROUND(IFNULL (SUM((target_fisik.agu)), 0), 2) as total_target_agu,
            ROUND(IFNULL (SUM((target_fisik.sep)), 0), 2) as total_target_sep,
            ROUND(IFNULL (SUM((target_fisik.okt)), 0), 2) as total_target_okt,
            ROUND(IFNULL (SUM((target_fisik.nov)), 0), 2) as total_target_nov,
            ROUND(IFNULL (SUM((target_fisik.des)), 0), 2) as total_target_des,




            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+1+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_jan,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+2+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_feb,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+3+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_mar,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+4+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_apr,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+5+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_mei,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+6+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_jun,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+7+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_jul,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+8+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_agu,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+9+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_sep,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+10+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_okt,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+11+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_nov,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+12+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_des,





            @a := (
                SELECT SUM(IFNULL(realisasi_fisik.realisasi,0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+bulan+` AND realisasi_fisik.yy = `+tahun+`)
            ) as total_realisasi








            FROM 
            monev_pembangunan.target_fisik target_fisik

            JOIN monev_pembangunan.pembangunan_list pembangunan_list
            ON pembangunan_list.id = target_fisik.pembangunan_list_id

            WHERE 
            pembangunan_list.unit_kerja = '`+unit_kerja+`' AND
            target_fisik.thn = `+tahun+`

        `;
        db.query(query, async (err, row)=>{
            if(err){
                console.log(err);
                res.send(err);
            }else{



                
                var data = row[0]



                data.rerata_target_jan = parseFloat((data.total_target_jan*100/data.total_rerata).toFixed(2))
                data.rerata_target_feb = parseFloat((data.total_target_feb*100/data.total_rerata).toFixed(2))
                data.rerata_target_mar = parseFloat((data.total_target_mar*100/data.total_rerata).toFixed(2))
                data.rerata_target_apr = parseFloat((data.total_target_apr*100/data.total_rerata).toFixed(2))
                data.rerata_target_mei = parseFloat((data.total_target_mei*100/data.total_rerata).toFixed(2))
                data.rerata_target_jun = parseFloat((data.total_target_jun*100/data.total_rerata).toFixed(2))
                data.rerata_target_jul = parseFloat((data.total_target_jul*100/data.total_rerata).toFixed(2))
                data.rerata_target_agu = parseFloat((data.total_target_agu*100/data.total_rerata).toFixed(2))
                data.rerata_target_sep = parseFloat((data.total_target_sep*100/data.total_rerata).toFixed(2))
                data.rerata_target_okt = parseFloat((data.total_target_okt*100/data.total_rerata).toFixed(2))
                data.rerata_target_nov = parseFloat((data.total_target_nov*100/data.total_rerata).toFixed(2))
                data.rerata_target_des = parseFloat((data.total_target_des*100/data.total_rerata).toFixed(2))



                data.jml_rerata_target_jan = parseFloat((data.rerata_target_jan).toFixed(2))
                data.jml_rerata_target_feb = parseFloat((data.rerata_target_jan + data.rerata_target_feb).toFixed(2))
                data.jml_rerata_target_mar = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar).toFixed(2))
                data.jml_rerata_target_apr = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar +data.rerata_target_apr).toFixed(2))
                data.jml_rerata_target_mei = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar +data.rerata_target_apr + data.rerata_target_mei).toFixed(2))
                data.jml_rerata_target_jun = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar +data.rerata_target_apr + data.rerata_target_mei + data.rerata_target_jun).toFixed(2))
                data.jml_rerata_target_jul = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar +data.rerata_target_apr + data.rerata_target_mei + data.rerata_target_jun + data.rerata_target_jul).toFixed(2))
                data.jml_rerata_target_agu = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar +data.rerata_target_apr + data.rerata_target_mei + data.rerata_target_jun + data.rerata_target_jul + data.rerata_target_agu).toFixed(2))
                data.jml_rerata_target_sep = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar +data.rerata_target_apr + data.rerata_target_mei + data.rerata_target_jun + data.rerata_target_jul + data.rerata_target_agu + data.rerata_target_sep).toFixed(2))
                data.jml_rerata_target_okt = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar +data.rerata_target_apr + data.rerata_target_mei + data.rerata_target_jun + data.rerata_target_jul + data.rerata_target_agu + data.rerata_target_sep + data.rerata_target_okt).toFixed(2))
                data.jml_rerata_target_nov = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar +data.rerata_target_apr + data.rerata_target_mei + data.rerata_target_jun + data.rerata_target_jul + data.rerata_target_agu + data.rerata_target_sep + data.rerata_target_okt + data.rerata_target_nov).toFixed(2))
                data.jml_rerata_target_des = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar +data.rerata_target_apr + data.rerata_target_mei + data.rerata_target_jun + data.rerata_target_jul + data.rerata_target_agu + data.rerata_target_sep + data.rerata_target_okt + data.rerata_target_nov + data.rerata_target_des).toFixed(2))




                

                data.data_target = [
                    data.jml_rerata_target_jan,
                    data.jml_rerata_target_feb,
                    data.jml_rerata_target_mar,
                    data.jml_rerata_target_apr,
                    data.jml_rerata_target_mei,
                    data.jml_rerata_target_jun,
                    data.jml_rerata_target_jul,
                    data.jml_rerata_target_agu,
                    data.jml_rerata_target_sep,
                    data.jml_rerata_target_okt,
                    data.jml_rerata_target_nov,
                    data.jml_rerata_target_des,
                ]
                data.data_realisasi = [
                    data.jml_rerata_realisasi_jan,
                    data.jml_rerata_realisasi_feb,
                    data.jml_rerata_realisasi_mar,
                    data.jml_rerata_realisasi_apr,
                    data.jml_rerata_realisasi_mei,
                    data.jml_rerata_realisasi_jun,
                    data.jml_rerata_realisasi_jul,
                    data.jml_rerata_realisasi_agu,
                    data.jml_rerata_realisasi_sep,
                    data.jml_rerata_realisasi_okt,
                    data.jml_rerata_realisasi_nov,
                    data.jml_rerata_realisasi_des,
                ]




                data.realisasi = parseFloat((data.total_realisasi*100/data.total_rerata).toFixed(2))
                data.blm_realisasi = 100-data.realisasi
                data.data = [data.realisasi, data.blm_realisasi]

                data.unit_kerja_uraian = await getUnitKerja(unit_kerja)



                res.json(data)



            }
        });








    // res.send(
    //     {
    //         data : [30, 70],
    //         unit_kerja_uraian : 'Dinas XXX YYY dari Server',
    //         get realisasi() {
    //             return this.data[0];
    //         },
    //         get blm_realisasi() {
    //             return this.data[1];
    //         },

    //     }
    // )
    
});



router.post('/chart', (req, res) => {

        // console.log(req.body);
    
        var tahun  = req.body.tahun;
        var bulan = req.body.bulan
        var unit_kerja = req.body.unit_kerja


    
        var query = `
            SELECT 
            target_fisik.id,

            @totalPembangunan := (

                SELECT COUNT (pembangunan_list.id) as jml_keg
                FROM monev_pembangunan.pembangunan_list pembangunan_list
                WHERE 
                pembangunan_list.unit_kerja = '`+unit_kerja+`' AND
                pembangunan_list.tahun = `+tahun+`
            ) as jml_pembangunan,


            @totalRerata := @totalPembangunan*100 as total_rerata,


            ROUND(IFNULL (SUM((target_fisik.jan)), 0), 2) as total_target_jan,
            ROUND(IFNULL (SUM((target_fisik.feb)), 0), 2) as total_target_feb,
            ROUND(IFNULL (SUM((target_fisik.mar)), 0), 2) as total_target_mar,
            ROUND(IFNULL (SUM((target_fisik.apr)), 0), 2) as total_target_apr,
            ROUND(IFNULL (SUM((target_fisik.mei)), 0), 2) as total_target_mei,
            ROUND(IFNULL (SUM((target_fisik.jun)), 0), 2) as total_target_jun,
            ROUND(IFNULL (SUM((target_fisik.jul)), 0), 2) as total_target_jul,
            ROUND(IFNULL (SUM((target_fisik.agu)), 0), 2) as total_target_agu,
            ROUND(IFNULL (SUM((target_fisik.sep)), 0), 2) as total_target_sep,
            ROUND(IFNULL (SUM((target_fisik.okt)), 0), 2) as total_target_okt,
            ROUND(IFNULL (SUM((target_fisik.nov)), 0), 2) as total_target_nov,
            ROUND(IFNULL (SUM((target_fisik.des)), 0), 2) as total_target_des,




            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+1+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_jan,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+2+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_feb,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+3+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_mar,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+4+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_apr,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+5+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_mei,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+6+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_jun,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+7+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_jul,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+8+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_agu,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+9+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_sep,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+10+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_okt,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+11+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_nov,
            (
                SELECT SUM(IFNULL(ROUND(realisasi_fisik.realisasi*100/@totalRerata, 2),0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+12+` AND realisasi_fisik.yy = `+tahun+`)
            ) as jml_rerata_realisasi_des,





            @a := (
                SELECT SUM(IFNULL(realisasi_fisik.realisasi,0))
                FROM monev_pembangunan.realisasi_fisik realisasi_fisik
                JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = realisasi_fisik.pembangunan_list_id
                WHERE 
                (realisasi_fisik.pembangunan_list_id = target_fisik.pembangunan_list_id AND pembangunan_list.unit_kerja = '`+unit_kerja+`') AND
                (realisasi_fisik.mm <= `+bulan+` AND realisasi_fisik.yy = `+tahun+`)
            ) as total_realisasi








            FROM 
            monev_pembangunan.target_fisik target_fisik

            JOIN monev_pembangunan.pembangunan_list pembangunan_list
            ON pembangunan_list.id = target_fisik.pembangunan_list_id

            WHERE 
            pembangunan_list.unit_kerja = '`+unit_kerja+`' AND
            target_fisik.thn = `+tahun+`

        `;
        db.query(query, async (err, row)=>{
            if(err){
                console.log(err);
                res.send(err);
            }else{



                
                var data = row[0]



                data.rerata_target_jan = parseFloat((data.total_target_jan*100/data.total_rerata).toFixed(2))
                data.rerata_target_feb = parseFloat((data.total_target_feb*100/data.total_rerata).toFixed(2))
                data.rerata_target_mar = parseFloat((data.total_target_mar*100/data.total_rerata).toFixed(2))
                data.rerata_target_apr = parseFloat((data.total_target_apr*100/data.total_rerata).toFixed(2))
                data.rerata_target_mei = parseFloat((data.total_target_mei*100/data.total_rerata).toFixed(2))
                data.rerata_target_jun = parseFloat((data.total_target_jun*100/data.total_rerata).toFixed(2))
                data.rerata_target_jul = parseFloat((data.total_target_jul*100/data.total_rerata).toFixed(2))
                data.rerata_target_agu = parseFloat((data.total_target_agu*100/data.total_rerata).toFixed(2))
                data.rerata_target_sep = parseFloat((data.total_target_sep*100/data.total_rerata).toFixed(2))
                data.rerata_target_okt = parseFloat((data.total_target_okt*100/data.total_rerata).toFixed(2))
                data.rerata_target_nov = parseFloat((data.total_target_nov*100/data.total_rerata).toFixed(2))
                data.rerata_target_des = parseFloat((data.total_target_des*100/data.total_rerata).toFixed(2))

                data.jml_rerata_target_jan = parseFloat((data.rerata_target_jan).toFixed(2))
                data.jml_rerata_target_feb = parseFloat((data.rerata_target_jan + data.rerata_target_feb).toFixed(2))
                data.jml_rerata_target_mar = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar).toFixed(2))
                data.jml_rerata_target_apr = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar +data.rerata_target_apr).toFixed(2))
                data.jml_rerata_target_mei = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar +data.rerata_target_apr + data.rerata_target_mei).toFixed(2))
                data.jml_rerata_target_jun = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar +data.rerata_target_apr + data.rerata_target_mei + data.rerata_target_jun).toFixed(2))
                data.jml_rerata_target_jul = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar +data.rerata_target_apr + data.rerata_target_mei + data.rerata_target_jun + data.rerata_target_jul).toFixed(2))
                data.jml_rerata_target_agu = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar +data.rerata_target_apr + data.rerata_target_mei + data.rerata_target_jun + data.rerata_target_jul + data.rerata_target_agu).toFixed(2))
                data.jml_rerata_target_sep = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar +data.rerata_target_apr + data.rerata_target_mei + data.rerata_target_jun + data.rerata_target_jul + data.rerata_target_agu + data.rerata_target_sep).toFixed(2))
                data.jml_rerata_target_okt = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar +data.rerata_target_apr + data.rerata_target_mei + data.rerata_target_jun + data.rerata_target_jul + data.rerata_target_agu + data.rerata_target_sep + data.rerata_target_okt).toFixed(2))
                data.jml_rerata_target_nov = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar +data.rerata_target_apr + data.rerata_target_mei + data.rerata_target_jun + data.rerata_target_jul + data.rerata_target_agu + data.rerata_target_sep + data.rerata_target_okt + data.rerata_target_nov).toFixed(2))
                data.jml_rerata_target_des = parseFloat((data.rerata_target_jan + data.rerata_target_feb + data.rerata_target_mar +data.rerata_target_apr + data.rerata_target_mei + data.rerata_target_jun + data.rerata_target_jul + data.rerata_target_agu + data.rerata_target_sep + data.rerata_target_okt + data.rerata_target_nov + data.rerata_target_des).toFixed(2))




                

                data.data_target = [
                    data.jml_rerata_target_jan,
                    data.jml_rerata_target_feb,
                    data.jml_rerata_target_mar,
                    data.jml_rerata_target_apr,
                    data.jml_rerata_target_mei,
                    data.jml_rerata_target_jun,
                    data.jml_rerata_target_jul,
                    data.jml_rerata_target_agu,
                    data.jml_rerata_target_sep,
                    data.jml_rerata_target_okt,
                    data.jml_rerata_target_nov,
                    data.jml_rerata_target_des,
                ]
                data.data_realisasi = [
                    data.jml_rerata_realisasi_jan,
                    data.jml_rerata_realisasi_feb,
                    data.jml_rerata_realisasi_mar,
                    data.jml_rerata_realisasi_apr,
                    data.jml_rerata_realisasi_mei,
                    data.jml_rerata_realisasi_jun,
                    data.jml_rerata_realisasi_jul,
                    data.jml_rerata_realisasi_agu,
                    data.jml_rerata_realisasi_sep,
                    data.jml_rerata_realisasi_okt,
                    data.jml_rerata_realisasi_nov,
                    data.jml_rerata_realisasi_des,
                ]




                data.realisasi = parseFloat((data.total_realisasi*100/data.total_rerata).toFixed(2))
                data.blm_realisasi = 100-data.realisasi
                data.data = [data.realisasi, data.blm_realisasi]

                data.unit_kerja_uraian = await getUnitKerja(unit_kerja)



                res.json(data)



            }
        });








    // res.send(
    //     {
    //         data : [30, 70],
    //         unit_kerja_uraian : 'Dinas XXX YYY dari Server',
    //         get realisasi() {
    //             return this.data[0];
    //         },
    //         get blm_realisasi() {
    //             return this.data[1];
    //         },

    //     }
    // )
    
});


router.post('/chartDetail', (req, res) => {

    // console.log(req.body);

    var tahun  = req.body.tahun;
    var bulan = req.body.bulan
    var unit_kerja = req.body.unit_kerja



    var query = `
        SELECT 
        pembangunan_list.*,
        @jan := IFNULL(target_fisik.jan, 0) as target_jan,
        @feb := IFNULL(target_fisik.feb, 0) as target_feb,
        @mar := IFNULL(target_fisik.mar, 0) as target_mar,
        @apr := IFNULL(target_fisik.apr, 0) as target_apr,
        @mei := IFNULL(target_fisik.mei, 0) as target_mei,
        @jun := IFNULL(target_fisik.jun, 0) as target_jun,
        @jul := IFNULL(target_fisik.jul, 0) as target_jul,
        @agu := IFNULL(target_fisik.agu, 0) as target_agu,
        @sep := IFNULL(target_fisik.sep, 0) as target_sep,
        @okt := IFNULL(target_fisik.okt, 0) as target_okt,
        @nov := IFNULL(target_fisik.nov, 0) as target_nov,
        @des := IFNULL(target_fisik.des, 0) as target_des,


        IFNULL(CASE 
            WHEN `+bulan+` = 1 THEN @jan
            WHEN `+bulan+` = 2 THEN @jan + @feb
            WHEN `+bulan+` = 3 THEN @jan + @feb + @mar
            WHEN `+bulan+` = 4 THEN @jan + @feb + @mar + @apr
            WHEN `+bulan+` = 5 THEN @jan + @feb + @mar + @apr + @mei
            WHEN `+bulan+` = 6 THEN @jan + @feb + @mar + @apr + @mei + @jun
            WHEN `+bulan+` = 7 THEN @jan + @feb + @mar + @apr + @mei + @jun + @jul
            WHEN `+bulan+` = 8 THEN @jan + @feb + @mar + @apr + @mei + @jun + @jul + @agu
            WHEN `+bulan+` = 9 THEN @jan + @feb + @mar + @apr + @mei + @jun + @jul + @agu + @sep
            WHEN `+bulan+` = 10 THEN @jan + @feb + @mar + @apr + @mei + @jun + @jul + @agu + @sep + @okt
            WHEN `+bulan+` = 11 THEN @jan + @feb + @mar + @apr + @mei + @jun + @jul + @agu + @sep + @okt + @nov
            WHEN `+bulan+` = 12 THEN @jan + @feb + @mar + @apr + @mei + @jun + @jul + @agu + @sep + @okt + @nov + @des

            ELSE 0
        END, 0) AS target,

        IFNULL((
            SELECT SUM(ROUND(realisasi_fisik.realisasi, 2))
            FROM monev_pembangunan.realisasi_fisik realisasi_fisik

            WHERE 
            (realisasi_fisik.pembangunan_list_id = pembangunan_list.id) AND
            (realisasi_fisik.mm <= `+bulan+` AND realisasi_fisik.yy = `+tahun+`)
        ),0) as realisasi

        FROM monev_pembangunan.pembangunan_list pembangunan_list

        LEFT JOIN monev_pembangunan.target_fisik target_fisik
        ON target_fisik.pembangunan_list_id = pembangunan_list.id  AND target_fisik.thn = `+tahun+`
        WHERE pembangunan_list.unit_kerja = '`+unit_kerja+`'



    `;
    db.query(query, async (err, row)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{


            res.json(row)



        }
    });


});





async function getUnitKerja(id) {
    

    return new Promise((resolve, reject) => {
        

        var query = `
        SELECT * FROM unit_kerja
        WHERE id = '`+id+`'
    `;
    db_simpeg.query(query, async (err, row)=>{
        if(err){
            resolve(err)
            console.log(err)
            res.send("ERROR");
        }else{
            
            resolve(row[0].unit_kerja)
        }
    });








    })



}




module.exports = router;
const express = require('express');
var db = require('../../../../db/MySql/umum');
var dbx = require('../../../../db/MySql/ukpbj_doc');
const router = express.Router();

let db_monev_pembangunan = process.env.DB_NAME_UMUM
let db_simpeg = process.env.DB_NAME_SIMPEG



router.get('/list', async (req, res) => {

    var prog_ukpbj = await getProgUkpbj()
    var dummyx = []


    for (let i = 0; i < prog_ukpbj.length; i++) {
        let prog_master_monev = await checkMasterProgMonev (prog_ukpbj[i].kd_program_str)
        if (prog_master_monev == 0) {
            // nah di sini kita insert dulu ke dalam maser program
            await insertMasterProgMonev (prog_ukpbj[i], req)
        }

        let prog_monev = await checkProgMonev (prog_ukpbj[i].kd_program_str, prog_ukpbj[i].unit_kerja_id, prog_ukpbj[i].tahun_anggaran)
        if (prog_monev == 0) {
            // nah di sini kita insert dulu ke dalam program
            // console.log(prog_ukpbj[i]);
            await insertProgMonev (prog_ukpbj[i], req)
        }

        // dummyx.push(prog_monev)
    }

    res.send(prog_ukpbj)


    
})

router.post('/list', (req, res) => {
    // console.log(req.body)
    console.log("list program terpanggil ++++++++++++++++++++++++")

    let view = ` 
        SELECT 
        master_program.*,
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

    // var userx = req.user.profile




    var data_batas = parseInt(req.body.page_limit);
    var data_star = (req.body.data_ke - 1) * data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    // console.log(req.body);



    // ======================== ABAIKAN INI TAPI JANGAN DI HAPUS ========================

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

    // ======================== ABAIKAN INI TAPI JANGAN DI HAPUS ========================



    // var filter_unit_kerja


    // console.log(userx.akses_unit); 








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

        AND (program.unit_kerja = '`+req.body.unit_kerja+`'
        AND program.tahun = `+req.body.tahun+`)
        
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

        AND (program.unit_kerja = '`+req.body.unit_kerja+`'
        AND program.tahun = `+req.body.tahun+`)
        
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

    // console.log(req.body);
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



async function getProgUkpbj (){

    return new Promise((resolve, reject) => {
        

        let view = ` 
            SELECT 
            #master_program.kd_program_str,
            #master_program.nama_program,
            #master_program.tahun_anggaran,
            #master_program.pagu_program,
            master_program.*,
            
            master_unit_kerja.nama_satker,
            master_unit_kerja.kd_satker_str,

            unit_kerja.id as unit_kerja_id,
            unit_kerja.unit_kerja as unit_kerja,

            monev_master_unit_kerja.urusan_bidang_kode as urusan_bidang_kode

            FROM ukpbj_doc.master_program master_program

            JOIN ukpbj_doc.master_unit_kerja master_unit_kerja
            ON master_unit_kerja.kd_satker = master_program.kd_satker

            LEFT JOIN simpeg.unit_kerja unit_kerja
            ON unit_kerja.kode = master_unit_kerja.kd_satker_str

            LEFT JOIN monev_pembangunan.master_unit_kerja monev_master_unit_kerja
            ON monev_master_unit_kerja.unit_kerja_id = unit_kerja.id AND monev_master_unit_kerja.utama = 1


            WHERE master_program.tahun_anggaran = 2024
            #AND master_unit_kerja.kd_satker_str = "1.02.0.00.0.00.01.0001"
            #AND master_unit_kerja.kd_satker_str = "1.02.0.00.0.00.01.0001"




            #LIMIT 10
            
        `;
        dbx.query(view, (err, row)=>{
            if (err) {
                console.log(err);
                res.json(err)
            }else{
                var data = []

                row.forEach(element => {

                    element.urusan_kode = getStr(element.urusan_bidang_kode, 0)
                    element.kode = getStr(element.kd_program_str, 2)
                    data.push(element)

                });
                // res.json(data)

                resolve(data)
            }
        })




    })

}

async function checkMasterProgMonev (kd_program_str) {
    return new Promise((resolve, reject) => {
        

        let view = ` 
            SELECT 
            COUNT(master_program.id) as jml
            from master_program
            WHERE
            master_program.kode_full = '`+kd_program_str+`'
            
            
        `;
        db.query(view, (err, row)=>{
            if (err) {
                console.log(err);
                resolve(err)
            }else{
                // console.log(row[0].jml);
                resolve(row[0].jml)
            }
        })




    })




}

async function insertMasterProgMonev (data, req) {
    return new Promise((resolve, reject) => {
        

        let view = `
        INSERT INTO master_program (urusan_kode , urusan_bidang_kode ,kode, kode_full, uraian, keterangan, createBy, createAt)
        VALUES (
            '`+data.urusan_kode+`',
            '`+data.urusan_bidang_kode+`',
            '`+data.kode+`',
            '`+data.kd_program_str+`',
            '`+data.nama_program+`',
            '-',
            'i33wtesojro8e65d',
            NOW()
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

async function checkProgMonev (kd_program_str, unit_kerja_id, tahun_anggaran) {
    return new Promise((resolve, reject) => {
        

        let view = ` 
            SELECT 
            COUNT(program.id) as jml
            from program
            WHERE
            program.program_kode = '`+kd_program_str+`' AND
            program.unit_kerja = '`+unit_kerja_id+`' AND
            program.tahun = `+tahun_anggaran+`
        `;
        db.query(view, (err, row)=>{
            if (err) {
                console.log(err);
                resolve(err)
            }else{
                // console.log(row[0].jml);
                resolve(row[0].jml)
            }
        })




    })




}

async function insertProgMonev (data, req) {
    return new Promise((resolve, reject) => {
        

        let view = `
            INSERT INTO program (program_kode , unit_kerja ,tahun, nilai_ukpbj_doc, createBy, createAt)
            VALUES (
                    '`+data.kd_program_str+`',
                    '`+data.unit_kerja_id+`',
                    `+data.tahun_anggaran+`,
                    `+data.pagu_program+`,
                    'i33wtesojro8e65d',
                    NOW()
                )
            `
                // '`+req.user._id+`',
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

function getStr(kode, index){
    var data = kode.split(".")

    return data[index]

}


module.exports = router;
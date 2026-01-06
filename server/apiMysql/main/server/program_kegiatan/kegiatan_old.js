const express = require('express');
var db = require('../../../../db/MySql/umum');
var dbx = require('../../../../db/MySql/ukpbj_doc');
const router = express.Router();


router.post('/list', (req, res) => {

    let view = ` 
        SELECT 
        master_kegiatan.*
        FROM master_kegiatan

        WHERE master_kegiatan.program_kode = '`+req.body.program_kode+`'
    `;
    db.query(view, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(row)
        }
    })
});


router.post('/viewWithoutPagin', (req, res) => {
    var cari = req.body.cari_value;
    var filter_program = ''
    if (req.body.program_kode == '' || req.body.program_kode == null || req.body.program_kode == undefined) {
        filter_program = ''
    } else {
        filter_program = `
        AND
        (master_kegiatan.program_kode = '`+req.body.program_kode+`')
        `
    }


    var filter_unit_kerja = ''

    if (req.body.unit_kerja == '' || req.body.unit_kerja == null || req.body.unit_kerja == undefined) {
        filter_unit_kerja = ''
    } else {
        filter_unit_kerja = `
            AND kegiatan.unit_kerja = '`+req.body.unit_kerja+`'
        `
    }


    let view = `
        SELECT 
        kegiatan.id as kegiatan_id,
        master_kegiatan.*,
        master_program.uraian as program_uraian,
        urusan_bidang.uraian as urusan_bidang_uraian,
        urusan_bidang.kode_full as urusan_bidang_kode,
        urusan.uraian as urusan_uraian,
        urusan.kode as urusan_kode

        FROM kegiatan
        
        LEFT JOIN master_kegiatan
        ON kegiatan.kegiatan_kode = master_kegiatan.kode_full

        LEFT JOIN master_program
        ON master_program.kode_full = master_kegiatan.program_kode

        LEFT JOIN urusan_bidang
        ON urusan_bidang.kode_full = master_program.urusan_bidang_kode

        LEFT JOIN urusan
        ON urusan.kode_full = master_program.urusan_kode

        WHERE master_kegiatan.uraian LIKE '%`+cari+`%'

        `+filter_unit_kerja+`

        `+filter_program+`

    `;

    
    db.query(view, async (err, result) => {
        if (err) { res.json(err) }
        else {


            
            for (let i = 0; i < result.length; i++) {
                // console.log(result[i].kode_full);

                result[i].sub_kegiatan = await getSubKegiatan(result[i].kode_full, req)
                var subkeg = result[i].sub_kegiatan

                var jml = 0
                var jml_realisasi = 0
                subkeg.forEach(element => {
                    jml = jml + element.jml
                    jml_realisasi = jml_realisasi + element.jml_realisasi
                });
                result[i].jml = jml
                result[i].jml_realisasi = jml_realisasi
                // console.log(i);
                // await getSubKegiatan(result[i].kode_full)
                
                
            }


            res.json({
                data: result,
                jml_data: 0
            })
        }
    })



});

router.post('/view', (req, res) => {
    var data_batas = parseInt(req.body.page_limit);
    var data_star = (req.body.data_ke - 1) * data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    // console.log("00000000");
    // console.log(req.body);
    // console.log("00000000");


    // ======================== ABAIKAN INI TAPI JANGAN DI HAPUS ========================
    var filter_program = ''

    if (req.body.program_kode == '' || req.body.program_kode == null || req.body.program_kode == undefined) {
        filter_program = ''
    } else {
        filter_program = `
        AND
        (master_kegiatan.program_kode = '`+req.body.program_kode+`')
        `
    }
    // ======================== ABAIKAN INI TAPI JANGAN DI HAPUS ========================



   
    let jml_data = ` 
    SELECT 
    master_kegiatan.id

    FROM kegiatan

    JOIN program
    ON kegiatan.program_kode = program.program_kode
        
    LEFT JOIN master_kegiatan
    ON kegiatan.kegiatan_kode = master_kegiatan.kode_full

    LEFT JOIN master_program
    ON master_program.kode_full = master_kegiatan.program_kode

    LEFT JOIN urusan_bidang
    ON urusan_bidang.kode_full = master_program.urusan_bidang_kode

    LEFT JOIN urusan
    ON urusan.kode_full = master_program.urusan_kode

    WHERE 
    (master_kegiatan.uraian LIKE '%`+cari+`%')
   `+filter_program+`

    AND (program.unit_kerja = '`+req.body.unit_kerja+`'
    AND program.tahun = `+req.body.tahun+`)

    `;

    let view = `
        SELECT 
        kegiatan.id as kegiatan_id,
        master_kegiatan.*,
        master_program.uraian as program_uraian,
        urusan_bidang.uraian as urusan_bidang_uraian,
        urusan_bidang.kode_full as urusan_bidang_kode,
        urusan.uraian as urusan_uraian,
        urusan.kode as urusan_kode

        FROM kegiatan
        
        JOIN program
        ON kegiatan.program_kode = program.program_kode

        LEFT JOIN master_kegiatan
        ON kegiatan.kegiatan_kode = master_kegiatan.kode_full

        LEFT JOIN master_program
        ON master_program.kode_full = master_kegiatan.program_kode

        LEFT JOIN urusan_bidang
        ON urusan_bidang.kode_full = master_program.urusan_bidang_kode

        LEFT JOIN urusan
        ON urusan.kode_full = master_program.urusan_kode

        WHERE master_kegiatan.uraian LIKE '%`+cari+`%'

        `+filter_program+`

        AND program.unit_kerja = '`+req.body.unit_kerja+`'
        AND program.tahun = `+req.body.tahun+`
        
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
                        // console.log(result[i].kode_full);

                        result[i].sub_kegiatan = await getSubKegiatan(result[i].kode_full, req)
                        var subkeg = result[i].sub_kegiatan

                        var jml = 0
                        var jml_realisasi = 0

                        subkeg.forEach(element => {
                            jml = jml + element.jml
                            jml_realisasi = jml_realisasi + element.jml_realisasi
                        });
                        result[i].jml = jml
                        result[i].jml_realisasi = jml
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


const getSubKegiatan = async (kegiatan_kode, req)=>{
    return new Promise((resolve, reject) => {
        let insert = `
            SELECT 
            
            master_kegiatan_sub.*,
            kegiatan_sub.id as kegiatan_sub_id,
            master_sumber_dana.uraian as master_sumber_dana_uraian
            
            FROM kegiatan_sub

            LEFT JOIN master_kegiatan_sub
            ON master_kegiatan_sub.kode_full = kegiatan_sub.kegiatan_sub_kode

            LEFT JOIN master_sumber_dana
            ON master_sumber_dana.kode_full = kegiatan_sub.sumber_dana

            WHERE kegiatan_sub.kegiatan_kode = '`+kegiatan_kode+`' AND kegiatan_sub.unit_kerja = '`+req.body.unit_kerja+`'
        `


        db.query(insert, async (err, row) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(row);

                
                for (let i = 0; i < row.length; i++) {
                    var tag = await getSubKegiatanTag(row[i].kode_full)

                    var jml = 0
                    var jml_realisasi = 0
                    tag.forEach(element => {
                        jml = jml + element.jml
                        jml_realisasi = jml_realisasi + element.jml_realisasi
                    });
                    row[i].jml = jml
                    row[i].jml_realisasi = jml_realisasi

                    row[i].tag = tag
                    
                }
                
                
                // console.log(row)
                
                resolve(row)
            }

        })

    })
}

const getSubKegiatanTag = async (kegiatan_sub_kode )=>{
    return new Promise((resolve, reject) => {
        let insert = `
            SELECT 
            kegiatan_sub_tag.*
            FROM kegiatan_sub_tag
            WHERE kegiatan_sub_tag.kegiatan_sub_kode  = '`+kegiatan_sub_kode +`'
        `


        db.query(insert, async (err, row) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(row);

                for (let i = 0; i < row.length; i++) {
                    var label = await getSubKegiatanLabel(row[i].id)


                    var jml = 0
                    var jml_realisasi = 0
                    label.forEach(element => {
                        jml = jml + element.jml
                        jml_realisasi = jml_realisasi + element.jml_realisasi
                    });
                    row[i].jml = jml
                    row[i].jml_realisasi = jml_realisasi

                    row[i].label = label
                    
                }


                resolve(row)
            }

        })




    })
}

const getSubKegiatanLabel = async (kegiatan_sub_tag_id )=>{
    return new Promise((resolve, reject) => {
        let insert = `
            SELECT 
            kegiatan_sub_label.*
            FROM kegiatan_sub_label
            WHERE kegiatan_sub_label.kegiatan_sub_tag_id  = `+kegiatan_sub_tag_id +`
        `

        db.query(insert, async (err, row) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(row);

                
                for (let i = 0; i < row.length; i++) {
                    var rincian = await getSubKegiatanRincian(row[i].id)
                    
                    var jml = 0;
                    var jml_realisasi = 0;
                    rincian.forEach(element => {
                        jml = jml + element.jml
                        jml_realisasi = jml_realisasi + element.total_jml_realisasi_keuangan
                    });

                    row[i].jml = jml
                    row[i].jml_realisasi = jml_realisasi
                    row[i].rincian = rincian
                    
                }


                resolve(row)
            }

        })




    })
}

const getSubKegiatanRincian = async (kegiatan_sub_label_id )=>{
    return new Promise((resolve, reject) => {
        let insert = `
            SELECT 
            kegiatan_sub_rincian.* ,
            ( SELECT COUNT(target_keuangan.id) 
                FROM target_keuangan
                WHERE target_keuangan.rincian_id = kegiatan_sub_rincian.id
            ) as jml_target_keuangan,

            ( SELECT COUNT(target_fisik.id) 
                FROM target_fisik
                WHERE target_fisik.rincian_id = kegiatan_sub_rincian.id
            ) as jml_target_fisik,

            ( SELECT SUM(realisasi_fisik.realisasi) 
                FROM realisasi_fisik
                WHERE realisasi_fisik.rincian_id = kegiatan_sub_rincian.id
            ) as jml_realisasi_fisik,

            ( SELECT SUM(realisasi_keuangan_serapan.realisasi) 
                FROM realisasi_keuangan_serapan
                WHERE realisasi_keuangan_serapan.rincian_id = kegiatan_sub_rincian.id
            ) as total_jml_realisasi_keuangan

            FROM kegiatan_sub_rincian
            WHERE kegiatan_sub_rincian.kegiatan_sub_label_id  = `+kegiatan_sub_label_id +`
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

    var kegiatan_kode = req.body.kegiatan_kode

    kegiatan_kode.forEach(body => {
        var view = `
            SELECT kegiatan.id 
            FROM kegiatan
            WHERE (kegiatan.kegiatan_kode = '`+body.kode_full+`' AND kegiatan.program_kode = '`+body.program_kode+`') 
            AND kegiatan.tahun = `+req.body.tahun+`
        `

        db.query(view, (err1, row1) => {
            if (err1) {
                console.log('errrrooorrr');
                console.log(err1);
                // res.send(err);
            } else {
                
                if (row1.length <= 0 ) {

                    let insert = `
                        INSERT INTO kegiatan (program_kode , kegiatan_kode, unit_kerja , tahun, createBy, createAt)
                        VALUES (
                            '`+body.program_kode+`',
                            '`+body.kode_full+`',
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
                            // res.send(err);
                        } else {
                            // console.log(row);
                            // res.send(row);
                        }
                    })


                    
                } else {
                    console.log("DATA SDH ADA")
                }









            }
        })
        
       
    });
    



    // console.log(req.body);
    res.send("OK")
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
        DELETE FROM kegiatan WHERE id = '`+req.body.kegiatan_id+`';
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
});






router.get('/sync_ukpbj', async (req, res) => {
    var data = await getKegiatanUkpbj()

    var dummyx = []



    for (let i = 0; i < data.length; i++) {
        // const element = array[i];

        let prog_master_monev = await checkMasterKegiatanMonev(data[i].kd_kegiatan_str)
        if (prog_master_monev == 0) {
            // nah di sini kita insert dulu ke dalam maser program
            await insertMasterKegiatanMonev(data[i], req)
        }

        let prog_monev = await checkKegiatanMonev(data[i])
        if (prog_monev == 0) {
            // nah di sini kita insert dulu ke dalam maser program
           await  insertKegiatanMonev(data[i], req)
        }
        
        
        
        
        // dummyx.push(prog_monev)



        
    }




    // res.send(dummyx);
    res.send(data);
    
});

async function getKegiatanUkpbj(){

    return new Promise((resolve, reject) => {


        let view = ` 
            SELECT 
            master_kegiatan.*,
            unit_kerja.id as unit_kerja_id,
            unit_kerja.unit_kerja as unit_kerja,
            master_program.kd_program_str as program_kode

            FROM ukpbj_doc.master_kegiatan master_kegiatan

            JOIN ukpbj_doc.master_program master_program
            ON master_kegiatan.kd_program = master_program.kd_program

            JOIN ukpbj_doc.master_unit_kerja master_unit_kerja
            ON master_unit_kerja.kd_satker = master_kegiatan.kd_satker

            LEFT JOIN simpeg.unit_kerja unit_kerja
            ON unit_kerja.kode = master_unit_kerja.kd_satker_str

            LEFT JOIN monev_pembangunan.master_unit_kerja monev_master_unit_kerja
            ON monev_master_unit_kerja.unit_kerja_id = unit_kerja.id AND monev_master_unit_kerja.utama = 1

            WHERE master_program.tahun_anggaran = 2024

        `;
        dbx.query(view, (err, row)=>{
            if (err) {
                resolve(err)
            }else{

                var datax = []
                row.forEach(element => {

                    element.kode = getStr(element.kd_kegiatan_str, 3)+"."+getStr(element.kd_kegiatan_str, 4)
                    
                    datax.push(element)


                });

                resolve(datax)
            }
        })

        
        
    })


}

async function checkMasterKegiatanMonev(kd_kegiatan_str){

    return new Promise((resolve, reject) => {
        

        let view = ` 
            SELECT 
            COUNT(master_kegiatan.id) as jml
            from master_kegiatan
            WHERE
            master_kegiatan.kode_full = '`+kd_kegiatan_str+`'
            
            
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
async function insertMasterKegiatanMonev(data, req){

    return new Promise((resolve, reject) => {
        let view = `
            INSERT INTO master_kegiatan (program_kode ,kode, kode_full, uraian, keterangan, createBy, createAt)
            VALUES (
                '`+data.program_kode+`',
                '`+data.kode+`',
                '`+data.kd_kegiatan_str+`',
                '`+data.nama_kegiatan+`',
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
async function checkKegiatanMonev(data){

    return new Promise((resolve, reject) => {
        
        let view = ` 
            SELECT 
            COUNT(kegiatan.id) as jml
            from kegiatan
    
            WHERE
            kegiatan.kegiatan_kode = '`+data.kd_kegiatan_str+`' AND
            kegiatan.unit_kerja = '`+data.unit_kerja_id+`' AND
            kegiatan.tahun = `+data.tahun_anggaran+`
            
            
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
function insertKegiatanMonev(data){
    return new Promise((resolve, reject) => {
        let view = `
            INSERT INTO kegiatan (program_kode , kegiatan_kode, nilai_ukpbj_doc, unit_kerja , tahun, createBy, createAt)
            VALUES (
                '`+data.program_kode+`',
                '`+data.kd_kegiatan_str+`',
                `+data.pagu_kegiatan+`,
                '`+data.unit_kerja_id+`',
                `+data.tahun_anggaran+`,
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

function getStr(kode, index){
    var data = kode.split(".")

    return data[index]

}


module.exports = router;
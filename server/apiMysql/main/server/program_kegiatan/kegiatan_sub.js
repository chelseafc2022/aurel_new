const express = require('express');
var db = require('../../../../db/MySql/umum');
var dbx = require('../../../../db/MySql/ukpbj_doc');
const router = express.Router();


router.post('/list', (req, res) => {
    // console.log(req.body)


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

router.post('/addData', (req, res) => {
    // console.log(req.body);


    var kegiatan_sub_kode = req.body.kegiatan_sub_kode


    kegiatan_sub_kode.forEach(body => {
        
        let insert = `
            INSERT INTO kegiatan_sub (kegiatan_kode, kegiatan_sub_kode, sumber_dana, unit_kerja, tahun, createBy, createAt)
            VALUES (
                '`+body.kegiatan_kode+`',
                '`+body.kode_full+`',
                '`+req.body.sumber_dana+`',
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
    });

    res.send("OK")
});

router.post('/removeData', (req, res)=> {
    var query = `
        DELETE FROM kegiatan_sub WHERE id = '`+req.body.kegiatan_sub_id+`';
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
    var data = await getKegiatanSubUkpbj()

    var dummyx = []



    for (let i = 0; i < data.length; i++) {


        let prog_master_monev = await checkMasterKegiatanSubMonev(data[i])
        if (prog_master_monev == 0) {
            // nah di sini kita insert dulu ke dalam maser program
            await insertMasterKegiatanSubMonev(data[i], req)
        }

        let prog_monev = await checkKegiatanSubMonev(data[i])
        if (prog_monev == 0) {
            // nah di sini kita insert dulu ke dalam maser program
           await  insertKegiatanSubMonev(data[i], req)
        }
        
        
        
        
        dummyx.push(prog_monev)



        
    }




    // res.send(dummyx);
    res.send(data);
    
});

async function getKegiatanSubUkpbj(){

    return new Promise((resolve, reject) => {


        let view = ` 
            SELECT 
            master_kegiatan_sub.*,
            master_kegiatan.kd_kegiatan_str as kegiatan_kode,
            unit_kerja.id as unit_kerja_id,
            unit_kerja.unit_kerja as unit_kerja

            FROM ukpbj_doc.master_kegiatan_sub master_kegiatan_sub
            
            JOIN ukpbj_doc.master_kegiatan master_kegiatan
            ON master_kegiatan.kd_kegiatan = master_kegiatan_sub.kd_kegiatan

            JOIN ukpbj_doc.master_unit_kerja master_unit_kerja
            ON master_unit_kerja.kd_satker = master_kegiatan_sub.kd_satker

            LEFT JOIN simpeg.unit_kerja unit_kerja
            ON unit_kerja.kode = master_unit_kerja.kd_satker_str

            LEFT JOIN monev_pembangunan.master_unit_kerja monev_master_unit_kerja
            ON monev_master_unit_kerja.unit_kerja_id = unit_kerja.id AND monev_master_unit_kerja.utama = 1

            WHERE master_kegiatan_sub.tahun_anggaran = 2024

        `;
        dbx.query(view, (err, row)=>{
            if (err) {
                resolve(err)
            }else{

                var datax = []
                row.forEach(element => {

                    element.kode = getStr(element.kd_subkegiatan_str, 5)
                    
                    datax.push(element)


                });

                resolve(datax)
            }
        })

        
        
    })


}

async function checkMasterKegiatanSubMonev(data){

    return new Promise((resolve, reject) => {
        

        let view = ` 
            SELECT 
            COUNT(master_kegiatan_sub.id) as jml
            from master_kegiatan_sub
            WHERE
            master_kegiatan_sub.kode_full = '`+data.kd_subkegiatan_str+`'
            
            
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
async function insertMasterKegiatanSubMonev(data, req){

    return new Promise((resolve, reject) => {
        let view = `
            INSERT INTO master_kegiatan_sub (kegiatan_kode, kode, kode_full, uraian, keterangan, createBy, createAt)
            VALUES (
                '`+data.kegiatan_kode+`',
                '`+data.kode+`',
                '`+data.kd_subkegiatan_str+`',
                '`+data.nama_subkegiatan+`',
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
async function checkKegiatanSubMonev(data){

    return new Promise((resolve, reject) => {
        
        let view = ` 
            SELECT 
            COUNT(kegiatan_sub.id) as jml
            from kegiatan_sub
    
            WHERE
            kegiatan_sub.kegiatan_sub_kode = '`+data.kd_subkegiatan_str+`' AND
            kegiatan_sub.unit_kerja = '`+data.unit_kerja_id+`' AND
            kegiatan_sub.tahun = `+data.tahun_anggaran+`
            
            
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
function insertKegiatanSubMonev(data){
    return new Promise((resolve, reject) => {
        let view = `
            INSERT INTO kegiatan_sub (kegiatan_kode, kegiatan_sub_kode, sumber_dana, unit_kerja, tahun, nilai_ukpbj_doc, createBy, createAt)
            VALUES (
                '`+data.kegiatan_kode+`',
                '`+data.kd_subkegiatan_str+`',
                NULL,
                '`+data.unit_kerja_id+`',
                `+data.tahun_anggaran+`,
                `+data.pagu_subkegiatan+`,
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



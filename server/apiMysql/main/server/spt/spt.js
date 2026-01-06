const express = require('express');
var db = require('../../../../db/MySql/umum');
var dbx = require('../../../../db/MySql/simpeg');
const router = express.Router();

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

router.post('/addData', (req, res) => {
    console.log(req.body);
    let insert = `
        INSERT INTO spt (uraian, no, tgl, dari, hingga, createdBy, createdAt)
        VALUES (
            '`+req.body.uraian+`',
            '`+req.body.no+`',
            '`+req.body.tgl+`',
            '`+req.body.dari+`',
            '`+req.body.hingga+`',
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
            // console.log(row.insertId);

            var pelaksana = req.body.spt_pelaksana
            for (let i = 0; i < pelaksana.length; i++) {
                await addPelaksana(req, res, row, pelaksana[i])
            }

            var kegiatan = req.body.spt_kegiatan
            for (let i = 0; i < kegiatan.length; i++) {
                await addKegiatan(req, res, row, kegiatan[i])
            }

            res.send(row);
        }
    })
    // console.log(req.body);
    // res.send("OK")
});

router.post('/editData', (req,res)=>{
    var query = `
        UPDATE spt SET
        no = '`+req.body.no+`',
        tgl = '`+req.body.tgl+`',
        dari = '`+req.body.dari+`',
        hingga = '`+req.body.hingga+`',
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
        DELETE FROM spt WHERE id = '`+req.body.id+`';
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
});



async function addPelaksana(req, res, row, data) {
    return new Promise(async(resolve, reject) => {
        
        
 
        let insert = `
        INSERT INTO spt_pelaksana (spt_id, unit_kerja_id, jabatan, master_spt_jabatan, nip, createdBy, createdAt)
        VALUES (
            `+row.insertId+`,
            '`+data.unit_kerja+`',
            '`+data.id_jabatan+`',
            `+data.master_spt_jabatan+`,
            '`+data.nip+`',
            '`+req.user._id+`',
            NOW()
            )
            `
            db.query(insert, (err, row) => {
                if (err) {
                    console.log(err);
                    resolve(err);
                } else {
                    console.log(row.insertId);
                    resolve(row);
                }
            })
            
    })
} 

async function addKegiatan(req, res, row, data) {
    return new Promise(async(resolve, reject) => {
        
        let insert = `
        INSERT INTO spt_kegiatan (spt_id, pembangunan_list_id, createdBy, createdAt)
        VALUES (
            `+row.insertId+`,
            '`+data.pembangunan_list_id+`',
            '`+req.user._id+`',
            NOW()
            )
            `
            db.query(insert, (err, row) => {
                if (err) {
                    console.log(err);
                    resolve(err);
                } else {
                    console.log(row.insertId);
                    resolve(row);
                }
            })
            
    })
} 
    
    
// =========================================================

router.post('/viewOne', (req, res) => {
    console.log(req.body);
    let query = `

            SELECT spt.* FROM spt
            WHERE spt.id = `+req.body.id+`

    `

    db.query(query, async (err, row) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {

            const kegiatan = await viewListKegiatan(row[0].id)
            const asn = await viewListASN(row[0].id) 

            res.send({
                data : row[0],
                kegiatan : kegiatan,
                asn : asn
            });
        }
    })
});

router.post('/viewSptKegiatan', async (req, res) => {
    console.log(req.body);
    var data = await viewListKegiatan(req.body.spt_id)
    res.send(data)
});




async function viewListKegiatan(spt_id){

    return new Promise((resolve, reject) => {
        let query = `
                SELECT 
                spt_kegiatan.*,
                pembangunan_list.uraian as pembangunan_uraian,
                pembangunan_list.pagu as pembangunan_pagu,
                unit_kerja.unit_kerja as unit_kerja_uraian,
                (
                    SELECT COUNT(spt_lhp_dokumentasi.id)
                    FROM spt_lhp_dokumentasi
                    WHERE 
                    spt_kegiatan.spt_id = spt_lhp_dokumentasi.spt_id AND
                    spt_kegiatan.pembangunan_list_id = spt_lhp_dokumentasi.pembangunan_list_id


                ) as jml_dokumentasi
                
                FROM monev_pembangunan.spt_kegiatan spt_kegiatan

                LEFT JOIN monev_pembangunan.pembangunan_list pembangunan_list
                ON pembangunan_list.id = spt_kegiatan.pembangunan_list_id


                LEFT JOIN simpeg.unit_kerja unit_kerja
                ON unit_kerja.id = pembangunan_list.unit_kerja


                WHERE spt_kegiatan.spt_id = `+spt_id+`
        `
    
        db.query(query, async (err, row) => {
            if (err) {
                console.log('SPT KEGIATAN',err);
                res.send(err);
            } else {
                resolve(row)
            }
        })
        
    })

}

async function viewListASN(spt_id){

    return new Promise((resolve, reject) => {
        let query = `
                SELECT 
                spt_pelaksana.*,
                biodata.gelar_belakang as biodata_gelar_belakang,
                biodata.gelar_depan as biodata_gelar_depan,
                biodata.nama as biodata_nama,
                unit_kerja.unit_kerja as biodata_nm_unit_kerja,
                jabatan.jabatan as biodata_nm_jabatan
                
                FROM monev_pembangunan.spt_pelaksana spt_pelaksana

                LEFT JOIN simpeg.biodata biodata
                ON biodata.nip = spt_pelaksana.nip

                LEFT JOIN simpeg.unit_kerja unit_kerja
                ON biodata.unit_kerja = unit_kerja.id

                LEFT JOIN simpeg.jabatan jabatan
                ON biodata.jabatan = jabatan._id




                WHERE spt_pelaksana.spt_id = `+spt_id+`
                ORDER BY spt_pelaksana.master_spt_jabatan DESC
        `
    
        dbx.query(query, async (err, row) => {
            if (err) {
                console.log('SPT KEGIATAN',err);
                res.send(err);
            } else {
                resolve(row)
            }
        })
        
    })




}


// =========================================================
    
    
    // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    // const processPelaksana = async (items) => {
        //   for (let i = 0; i < items.length; i++) {
            //     console.log(`Processing item: ${items[i]}`);
            //     await delay(100); // Simulasi operasi async
//   }
//   console.log('All items processed');
// };

// const items = [1, 2, 3, 4];
// processPelaksana(items);



module.exports = router;
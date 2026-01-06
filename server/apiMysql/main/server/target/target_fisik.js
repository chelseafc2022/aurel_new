const express = require('express');
var db = require('../../../../db/MySql/umum');
const router = express.Router();




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
router.post('/getOneV2', async(req, res) => {
    console.log(req.body)

    var listData = await getOneV2(req, res)

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

    let jml_data = ` SELECT * FROM urusan `;

    let view = `
        SELECT * FROM urusan
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

router.post('/addData', async(req, res) => {
    // console.log(req.body);
    
    var listData = await getOne(req, res)

    if (listData.length <= 0) {
        console.log("TAMBAH DATA TARGET KEUANGAN");
        await addData(req, res)
        
    } else {
        console.log("PERBAHARUI DATA TARGET KEUANGAN");
        await editData(req, res)
    }
    res.send("OK")
    

});

router.post('/addDataV2', async(req, res) => {
    console.log(req.body);
    
    var listData = await getOneV2(req, res)
    console.log(listData.length);

    if (listData.length <= 0) {
        console.log("TAMBAH DATA TARGET KEUANGAN V2");
        await addDataV2(req, res)
        
    } else {
        console.log("PERBAHARUI DATA TARGET KEUANGAN V2");
        await editDataV2(req, res)
    }
    res.send("OK")
    

});

async function getOne(req, res){
    return new Promise((resolve, reject) => {
        let view = ` 
            SELECT 
            target_fisik.*
            FROM target_fisik
            WHERE 
            (target_fisik.rincian_id = `+req.body.rincian_id+` AND target_fisik.thn = `+req.body.thn+`) AND
            target_fisik.status = `+req.body.status+`
        `;
        db.query(view, (err, row)=>{
            if (err) {
                console.log(err);
                resolve(err)
            }else{
                resolve(row)
            }
        })
    })

}

async function getOneV2(req, res){
    return new Promise((resolve, reject) => {
        let view = ` 
            SELECT 
            target_fisik.*
            FROM target_fisik
            WHERE 
            (
                ( target_fisik.rincian_id = `+req.body.rincian_id+` AND ISNULL(pembangunan_list_id) ) OR
                ( ISNULL(target_fisik.rincian_id) AND pembangunan_list_id = `+req.body.pembangunan_list_id+` ) OR
                ( target_fisik.rincian_id = `+req.body.rincian_id+` AND pembangunan_list_id = `+req.body.pembangunan_list_id+` )
            
            )
            
            AND
            (
                target_fisik.thn = `+req.body.thn+` AND
                target_fisik.status = `+req.body.status+`
            )
        `;
        db.query(view, (err, row)=>{
            if (err) {
                console.log(err);
                resolve(err)
            }else{
                resolve(row)
            }
        })
    })

}


async function addData(req, res){
    return new Promise((resolve, reject) => {
        let insert = `
            INSERT INTO target_fisik (rincian_id, jan, feb, mar, apr, mei, jun, jul, agu, sep, okt, nov, des, thn, createBy, createAt)
            VALUES (
                '`+req.body.rincian_id+`',
                `+req.body.jan+`,
                `+req.body.feb+`,
                `+req.body.mar+`,
                `+req.body.apr+`,
                `+req.body.mei+`,
                `+req.body.jun+`,
                `+req.body.jul+`,
                `+req.body.agu+`,
                `+req.body.sep+`,
                `+req.body.okt+`,
                `+req.body.nov+`,
                `+req.body.des+`,

                `+req.body.thn+`,

                '`+req.user._id+`',
                NOW()
            )
        `

        db.query(insert, (err, row) => {
            if (err) {
                console.log(err);
                resolve(err)
            }else{
                resolve(row)
            }
        })
    })

}

async function editData(req, res){
    return new Promise((resolve, reject) => {
        console.log(req.body);
        var query = `
            UPDATE target_fisik SET

            rincian_id     = '`+req.body.rincian_id+`',
            jan = `+req.body.jan+`,
            feb = `+req.body.feb+`,
            mar = `+req.body.mar+`,
            apr = `+req.body.apr+`,
            mei = `+req.body.mei+`,
            jun = `+req.body.jun+`,
            jul = `+req.body.jul+`,
            agu = `+req.body.agu+`,
            sep = `+req.body.sep+`,
            okt = `+req.body.okt+`,
            nov = `+req.body.nov+`,
            des = `+req.body.des+`,
            editeBy    = '`+req.user._id+`',
            editeAt    = NOW()

            WHERE (target_fisik.rincian_id = `+req.body.rincian_id+` AND target_fisik.thn = `+req.body.thn+`) AND
            target_fisik.status = `+req.body.status+`
        `;

        db.query(query, (err, row)=>{
            if(err) {
                console.log(err);
                resolve(err)
            }else{
                resolve(row)
            }
        }) 
    })

}
async function addDataV2(req, res){
    return new Promise((resolve, reject) => {
        let insert = `
            INSERT INTO target_fisik (pembangunan_list_id, jan, feb, mar, apr, mei, jun, jul, agu, sep, okt, nov, des, thn, createBy, createAt)
            VALUES (
                `+req.body.pembangunan_list_id+`,
                `+req.body.jan+`,
                `+req.body.feb+`,
                `+req.body.mar+`,
                `+req.body.apr+`,
                `+req.body.mei+`,
                `+req.body.jun+`,
                `+req.body.jul+`,
                `+req.body.agu+`,
                `+req.body.sep+`,
                `+req.body.okt+`,
                `+req.body.nov+`,
                `+req.body.des+`,

                `+req.body.thn+`,

                '`+req.user._id+`',
                NOW()
            )
        `

        db.query(insert, (err, row) => {
            if (err) {
                console.log(err);
                resolve(err)
            }else{
                console.log("sukses tambah data");
                resolve(row)
            }
        })
    })

}

async function editDataV2(req, res){
    return new Promise((resolve, reject) => {
        // console.log(req.body);
        var query = `
            UPDATE target_fisik SET

            pembangunan_list_id     = `+req.body.pembangunan_list_id+`,
            jan = `+req.body.jan+`,
            feb = `+req.body.feb+`,
            mar = `+req.body.mar+`,
            apr = `+req.body.apr+`,
            mei = `+req.body.mei+`,
            jun = `+req.body.jun+`,
            jul = `+req.body.jul+`,
            agu = `+req.body.agu+`,
            sep = `+req.body.sep+`,
            okt = `+req.body.okt+`,
            nov = `+req.body.nov+`,
            des = `+req.body.des+`,
            editeBy    = '`+req.user._id+`',
            editeAt    = NOW()

            WHERE (target_fisik.pembangunan_list_id = `+req.body.pembangunan_list_id+` AND target_fisik.thn = `+req.body.thn+`) AND
            target_fisik.status = `+req.body.status+`
        `;

        db.query(query, (err, row)=>{
            if(err) {
                console.log(err);
                resolve(err)
            }else{
                resolve(row)
            }
        }) 
    })

}

router.post('/editData', (req,res)=>{
    
});

router.post('/removeData', (req, res)=> {
    console.log(req.body);
    var query = `
        DELETE FROM urusan WHERE id = `+req.body.id+`;
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
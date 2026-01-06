const express = require('express');
var db = require('../../../../db/MySql/umum');
const router = express.Router();



var removeLib = require('../../../library/removeLib');
var viewLib = require('../../../library/viewLib');






router.post('/addData', (req, res) => {


    console.log(req.body)
    console.log("KEGIATAN SUB TAG TERPANGGIL")
    // res.send("ok")

    console.log("assss")

    let insert = `
        INSERT INTO kegiatan_sub_tag (kegiatan_sub_kode , uraian, keterangan, createBy, createAt)
        VALUES (
            '`+req.body.kegiatan_sub_kode+`',
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


});


router.post('/editData', (req,res)=>{

    console.log("EDIT KEGIATAN TAG DIPANGGIL");
    // console.log(req.body);
    // res.send("OK")


    var query = `
        UPDATE kegiatan_sub_tag SET
        kegiatan_sub_kode = '`+req.body.kegiatan_sub_kode+`',
        uraian = '`+req.body.uraian+`',
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

router.post('/removeData', async (req, res)=> {


    console.log("REMOVE KEGIATAN TAG DIPANGGIL");
    
    console.log(req.body);


    var getLabel = await viewLib.viewLabelByTag(req.body.id)


    var listLabel = []
    var listRincian = []

    for (let i = 0; i < getLabel.length; i++) {
        listLabel.push(getLabel[i])
        var getRincian = await viewLib.viewRincianByLabel(getLabel[i].id)

        for (let j = 0; j < getRincian.length; j++) {
            listRincian.push(getRincian[j])
        }
    }

    // console.log(listLabel);
    // console.log(listRincian);



    
    for (let i = 0; i < listLabel.length; i++) {
        await removeLib.removeLabelByTag(listLabel[i].kegiatan_sub_tag_id)
    }
    for (let i = 0; i < listRincian.length; i++) {
        await removeLib.removeRincianByLabel(listRincian[i].kegiatan_sub_label_id)
    }

    await removeLib.removeTagByid(req.body.id)








    res.send("OK")



});



router.post('/list', async (req, res) => {

    console.log(req.body)
   data  = await getList(req, res)
   
   res.send(data)
    


});





async function getList(req, res){
    return new Promise((resolve, reject) => {


        let view = `
            SELECT * 
            FROM kegiatan_sub_tag
            WHERE kegiatan_sub_kode = '`+req.body.kegiatan_sub_kode+`'
        
        `


        
        db.query(view, async (err, row) => {
            if (err) {
                console.log('errrrooorrr');
                resolve(err)
            } else {
                for (let i = 0; i < row.length; i++) {
                    row[i].label = await getLabel(row[i].id);
                }
                resolve(row)
            }
        })


        
    })
}


async function getLabel(kegiatan_sub_tag_id){
    return new Promise((resolve, reject) => {

        let view = `
            SELECT * 
            FROM kegiatan_sub_label
            WHERE kegiatan_sub_tag_id = '`+kegiatan_sub_tag_id+`'
        `


        
        db.query(view, async (err, row) => {
            if (err) {
                console.log('errrrooorrr');
                resolve(err)
            } else {


                for (let i = 0; i < row.length; i++) {
                    row[i].rincian = await getrincian(row[i].id);
                }



                resolve(row)
            }
        })


        
    })
}


async function getrincian(kegiatan_sub_label_id){
    return new Promise((resolve, reject) => {

        let view = `
            SELECT * 
            FROM kegiatan_sub_rincian
            WHERE kegiatan_sub_label_id = '`+kegiatan_sub_label_id+`'
        `


        
        db.query(view, (err, row) => {
            if (err) {
                console.log('errrrooorrr');
                resolve(err)
            } else {
                resolve(row)
            }
        })


        
    })
}




module.exports = router;



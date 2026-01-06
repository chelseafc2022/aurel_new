const express = require('express');
var db = require('../../../../db/MySql/umum');
const router = express.Router();
const fs = require('fs');

var upload = require('../../../../db/multer/pdf');



router.post('/view', (req, res) => {

    console.log(req.body)

    var query = `
        SELECT lampiran.* 
        FROM lampiran 
        WHERE 
        (lampiran.filetable  = '`+req.body.filetable+`' AND lampiran.fileref = `+req.body.fileref+`)
        
        ;
    `;
    db.query(query, (err, row)=>{
        if(err){
            console.log(err)
            res.send("ERROR");
        }else{
            res.send(row);
        }
    });
});



router.post('/addData',upload.single("file"), (req,res)=>{

    console.log(req.body);

 
    const insert = `INSERT INTO lampiran (uraian, fileref , filetable , keterangan, type, createBy, createAt, file) 
        VALUES (
        '`+req.body.uraian+`',
        `+req.body.fileref +`,
        '`+req.body.filetable +`',
        '`+req.body.keterangan+`',
        '`+req.file.mimetype+`',
        '`+req.user._id+`',
        NOW(),
        '`+req.file.filename+`'
        )
    `;


    console.log(insert)

    db.query(insert, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            res.send(row);
        }
    })
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
});

router.post('/editData',upload.single("file"), (req,res)=>{

    console.log(req.body)

    var query = '';
    if (req.file == undefined) {
        console.log('FILE KOSOOONG');
        query = `
        UPDATE lampiran SET
        uraian = '`+req.body.uraian+`',
        fileref  = `+req.body.fileref +`,
        filetable  = '`+req.body.filetable +`',
        keterangan = '`+req.body.keterangan+`',
        editeBy    = '`+req.user._id+`',
        editeAt    = NOW()

        WHERE id = '`+req.body.id+`'

        `;
    } else {

        console.log('FILE ADAAA');
        query = `
        UPDATE lampiran SET
        uraian = '`+req.body.uraian+`',
        fileref  = `+req.body.fileref +`,
        filetable  = '`+req.body.filetable +`',
        keterangan = '`+req.body.keterangan+`',
        editeBy    = '`+req.user._id+`',
        editeAt    = NOW(),
        file = '`+req.file.filename+`',
        type = '`+req.file.mimetype+`'

        WHERE id = '`+req.body.id+`'
        `;
        
        hapus_file(req.body.file_old);
        // console.log("================================")
        // console.log(req.body.file_old);
        // console.log("================================")
    }


    console.log(query)
    
    db.query(query, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            res.send(row);
        }
    })


    // console.log(req.body);
    

    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
})


router.post('/removeData', (req, res)=> {
    var file = req.body.file_old
    hapus_file(file);

    var query = `
        DELETE FROM lampiran WHERE id = '`+req.body.id+`'; 
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})


function hapus_file(file){
    const path = 'uploads/'+file;

    fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
          return
        }
    })

}


module.exports = router;
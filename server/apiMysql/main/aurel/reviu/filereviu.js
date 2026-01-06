const express = require('express');
var db = require('../../../../db/MySql/trista_monev');

const fs = require('fs');

var multer=require("multer");
var upload = require('../../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();



router.get('/', (req, res) => {

    let query = `
        SELECT
        file.*
        FROM file
    `
    db.query(query, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(row)
        }
    })
});



router.post('/view', (req, res) => {
    var data = req.body

    let query = `
        SELECT
        file_reviu.*, 
        unit_kerja.unit_kerja as unit_kerja_uraian,
        biodata.nama as nama

        FROM trista_monev.file_reviu file_reviu

        LEFT JOIN egov.users users
        ON users.id = file_reviu.createBy

        LEFT JOIN simpeg.instansi instansi
        ON file_reviu.unit_kerja_id = instansi.id

        LEFT JOIN simpeg.unit_kerja unit_kerja
        ON file_reviu.unit_kerja_id = unit_kerja.id

        LEFT JOIN simpeg.biodata biodata
        ON biodata.nip = users.nama_nip

        WHERE direktori_id = '`+data.direktori_id+`' AND unit_kerja_id = '`+data.unit_kerja_id+`' 

    `
    db.query(query, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(row)
        }
    })
});


router.post('/getView', (req, res) => {
    var data_batas = 8;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;
    let view = ''
    let jml_data = ''

    console.log(req.body);


    
    
    var filterUnitKerja = ''
    if (req.body.unit_kerja_id == null || req.body.unit_kerja_id == undefined || req.body.unit_kerja_id == '' ) {
        filterUnitKerja = ``
    }else {
    
    filterUnitKerja = ` AND file_reviu.unit_kerja_id = '`+req.body.unit_kerja_id+`' `
    }



    
    var filterDirektory = ''
    if (req.body.direktori_id == null || req.body.direktori_id == undefined || req.body.direktori_id == '') {
        filterDirektory=``
    } else {
        filterDirektory = ` AND file_reviu.direktori_id = '`+req.body.direktori_id+`'`
    }
    
    var filtertahun = ''
    if ( req.body.tahun == undefined || req.body.tahun == '' ||  req.body.tahun == 0) {
        filtertahun = ``
    } else {
        filtertahun = ` AND direktori_reviu.tahun = `+req.body.tahun+` `
    }
    

    var mk = ''
    if (req.body.level_user == 9 || req.body.level_user == 5 ) {
        jml_data = `
        SELECT
        file_reviu.*,
        unit_kerja.unit_kerja as unit_kerja_uraian,
        direktori_reviu.uraian as uraian_direktori,
        biodata.nama as nama,
        users.username as username
    
        FROM trista_monev.file_reviu file_reviu
    
        LEFT JOIN simpeg.unit_kerja unit_kerja
        ON file_reviu.unit_kerja_id = unit_kerja.id
    
        LEFT JOIN egov.users users
        ON users.id = file_reviu.createBy
    
        LEFT JOIN trista_monev.direktori_reviu direktori_reviu
        ON direktori_reviu.id = file_reviu.direktori_id
    
        LEFT JOIN simpeg.biodata biodata
        ON biodata.nip = users.nama_nip
    
    
        WHERE
        file_reviu.uraian LIKE '%`+cari+`%'
         
        `+filterDirektory+`
        `+filtertahun+`
        AND direktori_reviu.menu_klp = '`+req.body.level_user+`'
    
        ORDER BY file_reviu.createAt DESC
    
        
        LIMIT `+data_star+`,`+data_batas+`
        
        `

        view = `
        SELECT
        file_reviu.*,
        unit_kerja.unit_kerja as unit_kerja_uraian,
        direktori_reviu.uraian as uraian_direktori,
        biodata.nama as nama,
        users.username as username
    
        FROM trista_monev.file_reviu file_reviu
    
        LEFT JOIN simpeg.unit_kerja unit_kerja
        ON file_reviu.unit_kerja_id = unit_kerja.id
    
        LEFT JOIN egov.users users
        ON users.id = file_reviu.createBy
    
        LEFT JOIN trista_monev.direktori_reviu direktori_reviu
        ON direktori_reviu.id = file_reviu.direktori_id
    
        LEFT JOIN simpeg.biodata biodata
        ON biodata.nip = users.nama_nip
    
    
        WHERE
        file_reviu.uraian LIKE '%`+cari+`%'
         
        `+filterDirektory+`
        `+filtertahun+`
        AND direktori_reviu.menu_klp = '`+req.body.level_user+`'
    
        ORDER BY file_reviu.createAt DESC
    
        
        LIMIT `+data_star+`,`+data_batas+`        
        `

        
        
    }else if (req.body.level_user == 1){
        if (req.body.unit_kerja_id = 'juvJr4T244WcodnRk') {
            filterUnitKerja = ``
        }
        jml_data = `
        SELECT
        file_reviu.*,
        unit_kerja.unit_kerja as unit_kerja_uraian,
        direktori_reviu.uraian as uraian_direktori,
        biodata.nama as nama,
        users.username as username
    
        FROM trista_monev.file_reviu file_reviu
    
        LEFT JOIN simpeg.unit_kerja unit_kerja
        ON file_reviu.unit_kerja_id = unit_kerja.id
    
        LEFT JOIN egov.users users
        ON users.id = file_reviu.createBy
    
        LEFT JOIN trista_monev.direktori_reviu direktori_reviu
        ON direktori_reviu.id = file_reviu.direktori_id
    
        LEFT JOIN simpeg.biodata biodata
        ON biodata.nip = users.nama_nip
    
    
        WHERE
        file_reviu.uraian LIKE '%`+cari+`%'
        `+filterUnitKerja+`
        `+filterDirektory+`
        `+filtertahun+`
    
        ORDER BY file_reviu.createAt DESC
    
        
        LIMIT `+data_star+`,`+data_batas+`
        
     
            
        `

    view = `
    SELECT
    file_reviu.*,
    unit_kerja.unit_kerja as unit_kerja_uraian,
    direktori_reviu.uraian as uraian_direktori,
    biodata.nama as nama,
    users.username as username

    FROM trista_monev.file_reviu file_reviu

    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON file_reviu.unit_kerja_id = unit_kerja.id

    LEFT JOIN egov.users users
    ON users.id = file_reviu.createBy

    LEFT JOIN trista_monev.direktori_reviu direktori_reviu
    ON direktori_reviu.id = file_reviu.direktori_id

    LEFT JOIN simpeg.biodata biodata
    ON biodata.nip = users.nama_nip


    WHERE
    file_reviu.uraian LIKE '%`+cari+`%'
    `+filterUnitKerja+`
    `+filterDirektory+`
    `+filtertahun+`

    ORDER BY file_reviu.createAt DESC
    LIMIT `+data_star+`,`+data_batas+`
    `        

    }

    else{
    jml_data = `
        SELECT
        file_reviu.*,
        unit_kerja.unit_kerja as unit_kerja_uraian,
        direktori_reviu.uraian as uraian_direktori,
        biodata.nama as nama,
        users.username as username
    
        FROM trista_monev.file_reviu file_reviu
    
        LEFT JOIN simpeg.unit_kerja unit_kerja
        ON file_reviu.unit_kerja_id = unit_kerja.id
    
        LEFT JOIN egov.users users
        ON users.id = file_reviu.createBy
    
        LEFT JOIN trista_monev.direktori_reviu direktori_reviu
        ON direktori_reviu.id = file_reviu.direktori_id
    
        LEFT JOIN simpeg.biodata biodata
        ON biodata.nip = users.nama_nip
    
    
        WHERE
        file_reviu.uraian LIKE '%`+cari+`%'
        `+filterUnitKerja+`
        `+filterDirektory+`
        `+filtertahun+`
    
        ORDER BY file_reviu.createAt DESC
    
        
        LIMIT `+data_star+`,`+data_batas+`
        
     
            
        `

    view = `
    SELECT
    file_reviu.*,
    unit_kerja.unit_kerja as unit_kerja_uraian,
    direktori_reviu.uraian as uraian_direktori,
    biodata.nama as nama,
    users.username as username

    FROM trista_monev.file_reviu file_reviu

    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON file_reviu.unit_kerja_id = unit_kerja.id

    LEFT JOIN egov.users users
    ON users.id = file_reviu.createBy

    LEFT JOIN trista_monev.direktori_reviu direktori_reviu
    ON direktori_reviu.id = file_reviu.direktori_id

    LEFT JOIN simpeg.biodata biodata
    ON biodata.nip = users.nama_nip


    WHERE
    file_reviu.uraian LIKE '%`+cari+`%'
    `+filterUnitKerja+`
    `+filterDirektory+`
    `+filtertahun+`

    ORDER BY file_reviu.createAt DESC
    LIMIT `+data_star+`,`+data_batas+`
    `
    }



    console.log(view);







    db.query(jml_data, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            halaman = Math.ceil(row.length/data_batas);
            if(halaman<1){halaman = 1}
            // ========================
            db.query(view, (err, result)=>{
                if (err) {res.json(err)}
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

router.post('/getView4', (req, res) => {
    var data_batas = 8;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;



    let jml_data = `
    SELECT
    file_reviu.*,
    unit_kerja.unit_kerja as unit_kerja_uraian,
    direktori_reviu.uraian as uraian_direktori,
    biodata.nama as nama,
    users.username as username

    FROM trista_monev.file_reviu file_reviu

    LEFT JOIN simpeg.instansi instansi
    ON file_reviu.unit_kerja_id = instansi.id

    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON file_reviu.unit_kerja_id = unit_kerja.id


    LEFT JOIN egov.users users
    ON users.id = file_reviu.createBy

    LEFT JOIN trista_monev.direktori_reviu direktori_reviu
    ON direktori_reviu.id = file_reviu.direktori_id

    LEFT JOIN simpeg.biodata biodata
    ON biodata.nip = users.nama_nip


    WHERE file_reviu.master_type_id = 3 AND file_reviu.status_wali = 1 AND
    file_reviu.uraian LIKE '%`+cari+`%'

    
    ORDER BY file_reviu.createAt DESC

    
    LIMIT `+data_star+`,`+data_batas+`
    
 
        
    `

    let view = `
        SELECT
        file_reviu.*,
        unit_kerja.unit_kerja as unit_kerja_uraian,
        direktori_reviu.uraian as uraian_direktori,
        biodata.nama as nama,
        users.username as username

        FROM trista_monev.file_reviu file_reviu

        
    LEFT JOIN simpeg.instansi instansi
    ON file_reviu.unit_kerja_id = instansi.id
    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON file_reviu.unit_kerja_id = unit_kerja.id

        LEFT JOIN egov.users users
        ON users.id = file_reviu.createBy

        LEFT JOIN trista_monev.direktori_reviu direktori_reviu
        ON direktori_reviu.id = file_reviu.direktori_id

        LEFT JOIN simpeg.biodata biodata
        ON biodata.nip = users.nama_nip


        WHERE file_reviu.master_type_id = 3 AND file_reviu.status_wali = 1 AND
        file_reviu.uraian LIKE '%`+cari+`%'

        ORDER BY file_reviu.createAt DESC
        

        LIMIT `+data_star+`,`+data_batas+`
    `
    db.query(jml_data, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            halaman = Math.ceil(row.length/data_batas);
            if(halaman<1){halaman = 1}
            // ========================
            db.query(view, (err, result)=>{
                if (err) {res.json(err)}
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



router.post('/addData',upload.single("file"), (req,res)=>{

    var pb = JSON.parse(req.body.pb);
    var file = req.file;
    

    // console.log('============ PB =================');

     let insert = `INSERT INTO file_reviu (id, direktori_id, unit_kerja_id, master_type_id, uraian, keterangan, file, file_type, status_wali, status_opd, createAt, createBy, notice)
    VALUES (
        '`+uniqid()+`',
        '`+pb.direktori_id+`',
        '`+pb.unit_kerja_id+`',
        `+pb.master_type_id+`,
        '`+pb.uraian+`',
        '`+pb.keterangan+`',
        '`+file.filename+`',
        '`+file.mimetype+`',
        0,
        0,
        NOW(),
        '`+req.user._id+`',
        'Mohon menunggu proses verifikasi dan publikasi file anda ..'
        )
    `

    db.query(insert, (err, row)=>{
        if(err) {
            console.log('errrrooorrr');
            console.log(err);
            res.send(err);
        }else{
            console.log(row);
            res.send(row);
        }
    })

    // console.log(req.body);
    // res.send('OK')
});

router.post('/editData',upload.single("file"), (req,res)=>{
    var pb = JSON.parse(req.body.pb);
    var file = req.file;



    if (req.file == undefined) {
        // console.log("tidak ada file")
        var insert = `
            UPDATE file_reviu SET
            master_type_id = '`+pb.master_type_id+`',
            uraian = '`+pb.uraian+`',
            keterangan = '`+pb.keterangan+`',
            status_wali = 0,
            notice = 'Mohon menunggu proses verifikasi dan publikasi file anda ..',

            editeBy = '`+req.user._id+`',
            editeAt =  NOW()

            WHERE id = '`+pb.id+`'

        `
    } else {
        var insert = `
            UPDATE file_reviu SET
            master_type_id = '`+pb.master_type_id+`',
            uraian = '`+pb.uraian+`',
            keterangan = '`+pb.keterangan+`',
            file = '`+file.filename+`',
            file_type = '`+file.mimetype+`',
            status_wali = 0,
            notice = 'Mohon menunggu proses verifikasi dan publikasi file anda ..',

            editeBy = '`+req.user._id+`',
            editeAt =  NOW()

            WHERE id = '`+pb.id+`'

        `
        hapus_file(req.body.fileOld);
    }


    db.query(insert, (err, row)=>{
        if(err) {
            console.log('errrrooorrr');
            console.log(err);
            res.send(err);
        }else{
            console.log(row);
            res.send(row);
        }
    })

    // console.log(req.body);
    // res.send('OK')
});

router.post('/addDatax',upload.single("file"), (req,res)=>{

    var pbx = JSON.parse(req.body.pbx);
    var file = req.file;
    

    console.log('============ PBx =================');
    console.log(req.body.pbx);

     let insert = `INSERT INTO hasilaudit (id, direktori_id, unit_kerja_id, uraian, keterangan, file, file_type, createAt, createBy)
    VALUES (
        '`+uniqid()+`',
        '`+pbx.direktori_id+`',
        '`+pbx.unit_kerja_id+`',
        '`+pbx.uraian+`',
        '`+pbx.keterangan+`',
        '`+file.filename+`',
        '`+file.mimetype+`',
        NOW(),
        '`+req.user._id+`'
        )
    `

    db.query(insert, (err, row)=>{
        if(err) {
            console.log('errrrooorrr');
            console.log(err);
            res.send(err);
        }else{
            console.log(row);
            res.send(row);
        }
    })

    // console.log(req.body);
    // res.send('OK')
});

router.post('/editDatax',upload.single("file"), (req,res)=>{
    var pbx = JSON.parse(req.body.pbx);
    var file = req.file;



    if (req.file == undefined) {
        var insert = `
            UPDATE hasilaudit SET
            uraian = '`+pbx.uraian+`',
            keterangan = '`+pbx.keterangan+`',
            editeBy = '`+req.user._id+`',
            editeAt =  NOW()

            WHERE id = '`+pbx.id+`'

        `
    } else {
        var insert = `
            UPDATE hasilaudit SET
            uraian = '`+pbx.uraian+`',
            keterangan = '`+pbx.keterangan+`',
            file = '`+file.filename+`',
            file_type = '`+file.mimetype+`',
            editeBy = '`+req.user._id+`',
            editeAt =  NOW()

            WHERE id = '`+pbx.id+`'

        `
        hapus_file(req.body.fileOld);
    }


    db.query(insert, (err, row)=>{
        if(err) {
            console.log('errrrooorrr');
            console.log(err);
            res.send(err);
        }else{
            console.log(row);
            res.send(row);
        }
    })

    // console.log(req.body);
    // res.send('OK')
});


router.post('/removeDatax', (req, res)=> {
    var file = req.body.file
    hapus_file(file);

    var query = `
        DELETE FROM hasilaudit WHERE id = '`+req.body.id+`';
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})


router.post('/removeData', (req, res)=> {
    var file = req.body.file
    hapus_file(file);

    var query = `
        DELETE FROM file_reviu WHERE id = '`+req.body.id+`';
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})






router.post('/approve', (req,res)=>{
    var insert = `
        UPDATE file_reviu SET
        status_wali = 1,
        notice = 'Dokumen telah dipublikasi, file tidak dapat dihapus ataupun dirubah ..'
        WHERE id = '`+req.body.id+`'
    `
    db.query(insert, (err, row)=>{
        if(err) {
            console.log('errrrooorrr');
            console.log(err);
            res.send(err);
        }else{
            console.log(row);
            res.send(row);
        }
    })

});



router.post('/kembalikan', (req,res)=>{
    console.log(req.body)
    var insert = `
        UPDATE file_reviu SET
        status_wali = 2,
        notice = '`+req.body.notice+`'

        WHERE id = '`+req.body.id+`'
    `
    db.query(insert, (err, row)=>{
        if(err) {
            console.log('errrrooorrr');
            console.log(err);
            res.send(err);
        }else{
            console.log(row);
            res.send(row);
        }
    })

});



router.post('/hasilaudit', (req, res) => {
   
    var unit_kerja = req.body.unit_kerja;
    var direktori_id = req.body.direktori_id;
   

    let view = `
    SELECT file_reviu FROM hasilaudit WHERE direktori_id = '`+direktori_id+`' AND unit_kerja_id = '`+unit_kerja+`'

        
    `
    
            // ========================
            db.query(view, (err, result)=>{
                if (err) {res.json(err)}
                else{
                    res.json({
                        data : result,
                        
                    })
                }
            })
            // ========================

});


router.post('/tanggapan', (req, res) => {
    var data = req.body 
   console.log(data);

    let view = `
    SELECT hasilaudit.*
    
    FROM trista_monev.hasilaudit hasilaudit 
    
    WHERE direktori_id = '`+data.direktori_id+`' AND unit_kerja_id = '`+data.unit_kerja_id+`'

        
    `
    
            // ========================
            db.query(view, (err, result)=>{
                if (err) {res.json(err)}
                else{
                    console.log(result);
                    res.json({
                        data : result,
                        
                    })
                }
            })
            // ========================

});









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
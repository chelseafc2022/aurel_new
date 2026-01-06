const express = require('express');
var db = require('../../../../db/MySql/trista_monev');

const fs = require('fs');

var multer=require("multer");
var upload = require('../../../../db/multer/pdf');

var uniqid = require('uniqid');
const { log } = require('console');
const router = express.Router();



router.get('/', (req, res) => {

    let query = `
        SELECT
        direktori_reviu.*
        FROM direktori_reviu
       
    `
    db.query(query, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(row)
        }
    })
});





router.post('/unitkerja', (req, res) => {
    // console.log("asdasdasda ", req.body.unit_kerja_id);
    
    let view = `

    SELECT instansi FROM instansi WHERE id =  '`+ req.body.unit_kerja_id +`'
        
        
        ;

    
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

router.post('/lokasi', (req, res) => {
    console.log("asdasdasda ",req.body.id_direktori);
    
    let view = `

        SELECT unit_kerja.id, unit_kerja.unit_kerja, unit_kerja.alamat 
        FROM simpeg.unit_kerja unit_kerja 
        LEFT JOIN trista_monev.opd_dipilih opd_dipilih
                ON opd_dipilih.id_unit_kerja = unit_kerja.id
                
        WHERE opd_dipilih.id_direktori = '`+ req.body.id_direktori +`'
        
        
        ;

    
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

router.post('/view', (req, res) => {
    var data_batas = 8;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    var instansi = ''


    if (req.body.tipe==1) {
        instansi = `
        
        (direktori_reviu.master_type_id = 2 AND direktori_reviu.unit_kerja_id = '`+ req.body.unit_kerja_id +`') ||
        (direktori_reviu.master_type_id  = 3 AND direktori_reviu.createBy = '`+ req.user._id +`') ||
        (direktori_reviu.master_type_id  = 1 AND direktori_reviu.unit_kerja_id = '`+ req.body.unit_kerja_id +`') 


         `

        opddipilih = ``
        
    }  else if (req.body.tipe==5) {
        instansi = `
        
        (direktori_reviu.master_type_id = 2  AND direktori_reviu.menu_klp = 5) ||
        (direktori_reviu.master_type_id  = 3 AND direktori_reviu.createBy = '`+ req.user._id +`') ||
        (direktori_reviu.master_type_id  = 1 AND direktori_reviu.menu_klp = 5) 


         `

        opddipilih = ``
        
    } else if (req.body.tipe==6) {
        instansi = `
        
        (direktori_reviu.master_type_id = 2 AND direktori_reviu.menu_klp = 6 ) ||
        (direktori_reviu.master_type_id  = 3 AND direktori_reviu.createBy = '`+ req.user._id +`') ||
        (direktori_reviu.master_type_id  = 1 AND direktori_reviu.menu_klp = 6) 


         `

        opddipilih = ``
        
    } else if (req.body.tipe==7) {
        instansi = `
        
        (direktori_reviu.master_type_id = 2 AND direktori_reviu.menu_klp = 7) ||
        (direktori_reviu.master_type_id  = 3 AND direktori_reviu.createBy = '`+ req.user._id +`') ||
        (direktori_reviu.master_type_id  = 1 AND direktori_reviu.menu_klp = 7) 

         `

        opddipilih = ``
        
    } else if (req.body.tipe==8) {
        instansi = `
        
        (direktori_reviu.master_type_id = 2 AND direktori_reviu.menu_klp = 8) ||
        (direktori_reviu.master_type_id  = 3 AND direktori_reviu.createBy = '`+ req.user._id +`') ||
        (direktori_reviu.master_type_id  = 1 AND direktori_reviu.menu_klp = 8) 


         `

        opddipilih = ``
        
    }else if (req.body.tipe==9) {
        instansi = `
        
        (direktori_reviu.master_type_id = 2 AND direktori_reviu.menu_klp = 9) ||
        (direktori_reviu.master_type_id  = 3 AND direktori_reviu.createBy = '`+ req.user._id +`') ||
        (direktori_reviu.master_type_id  = 1 AND direktori_reviu.menu_klp = 9) 


         `

        opddipilih = ``
        
    } else {
        // instansi = `AND opd_dipilih.id_instansi = '`+req.body.id_instansi+`' `
        instansi = ` (
            (direktori_reviu.master_type_id  = 3 AND opd_dipilih.id_instansi = '`+ req.body.instansi_id +`') || 
            (direktori_reviu.master_type_id  = 2 AND opd_dipilih.id_instansi = '`+ req.body.unit_kerja +`') ||
        (direktori_reviu.master_type_id  = 1 AND direktori_reviu.unit_kerja_id = '`+ req.body.unit_kerja_id +`') 
        ) `


        opddipilih = ` LEFT JOIN trista_monev.opd_dipilih opd_dipilih
        ON direktori_reviu.id = opd_dipilih.id_direktori `

    }

    var filterirban = ''
    if ( req.body.irban == undefined || req.body.irban == '' ||  req.body.irban == 0) {
        // console.log("ini")
        filterirban = ``
    } else {
        filterirban = ` AND direktori_reviu.menu_klp = `+req.body.irban+` `
    }
    


    let jml_data = `
    SELECT
    direktori_reviu.*,
    unit_kerja.unit_kerja as unit_kerja_uraian, menu_klp.uraian as userx,
    master_type.uraian as master_uraian,
    users.username as username,
    (SELECT 
        COUNT(id)
        FROM file_reviu
        
       
    ) as jmldirektori

    

    FROM trista_monev.direktori_reviu direktori_reviu

    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON direktori_reviu.unit_kerja_id = unit_kerja.id

    
    `+opddipilih+`
    

    LEFT JOIN trista_monev.master_type master_type
    ON direktori_reviu.master_type_id = master_type.id

    LEFT JOIN trista_monev.menu_klp menu_klp
    ON direktori_reviu.menu_klp = menu_klp.id


    LEFT JOIN egov.users users
    ON users.id = direktori_reviu.createBy
        


        WHERE `+instansi+` 

        AND

        `+filterirban+`

        direktori_reviu.uraian LIKE '%`+cari+`%'

        
    `

    let view = `
    SELECT
    direktori_reviu.*,
    unit_kerja.unit_kerja as unit_kerja_uraian, menu_klp.uraian as userx,
    master_type.uraian as master_uraian,
    users.username as username,
    (SELECT 
        COUNT(id)
        FROM file_reviu
        
       
    ) as jmldirektori

    

    FROM trista_monev.direktori_reviu direktori_reviu

    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON direktori_reviu.unit_kerja_id = unit_kerja.id
    
    LEFT JOIN trista_monev.menu_klp menu_klp
    ON direktori_reviu.menu_klp = menu_klp.id

    `+opddipilih+`

    

    LEFT JOIN trista_monev.master_type master_type
    ON direktori_reviu.master_type_id = master_type.id


    LEFT JOIN egov.users users
    ON users.id = direktori_reviu.createBy
        


        WHERE `+instansi+`
        
        AND

        direktori_reviu.uraian LIKE '%`+cari+`%'

        ORDER BY direktori_reviu.createAt DESC

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

router.post('/addData',(req,res)=>{
    var id = uniqid()
    // console.log('jalan pertama');
    // console.log(req.body);
    var data = req.body.form
    


    let insert = `
    INSERT INTO direktori_reviu (id, uraian, keterangan, daritgl, sampaitgl, tahun, unit_kerja_id, master_type_id, menu_klp, createAt, createBy)
    VALUES (
       '`+id+`',
       '`+data.uraian+`',
       '`+data.keterangan+`',
       '`+data.daritgl+`',
       '`+data.sampaitgl+`',
       '`+data.tahun+`',
       '`+data.unit_kerja_id+`',
       '`+data.master_type_id+`',
       '`+data.menu_klp+`',
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
           masukanOpd(req.body.lokasi, id)
           console.log(row);
           res.send(row);

       }
   })
   // console.log(req.body);
});


function masukanOpd(params, id) {
    console.log('query ke dua');
    
    // var feed = {
    //     "id":"i33wtjx0k2hcfnm6", 
    //     "instansi": 'INSPEKTORAT',
    //     "alamat": '-'
    // };
    
    var data = params
    // data.push(feed)
    console.log(data);


    for(var i in data){

        let insert = `
        INSERT INTO opd_dipilih (id, id_direktori, id_instansi)
        VALUES (
        '`+uniqid()+`' ,
        '`+id+`',
        '`+data[i].id+`' 
         )
     `
         db.query(insert, (err, row)=>{
             if(err) {
                 console.log('error');
                //  console.log(err);
                //  res.send(err);
             }else{

                 console.log('sukseeees');
                //  console.log(row);
                //  res.send(row)
                }
            })
            
        }
    
}

router.post('/cetak', (req, res)=> {

    query = `
        
    SELECT opd_dipilih.id_instansi, direktori_reviu.id, direktori_reviu.uraian,
    instansi.instansi as instansi_uraian,
    direktori_reviu.uraian as uraianCetak

    FROM trista_monev.opd_dipilih opd_dipilih 

    LEFT JOIN simpeg.instansi instansi
    ON opd_dipilih.id_instansi = instansi.id

    LEFT JOIN trista_monev.direktori_reviu direktori_reviu
    ON opd_dipilih.id_direktori = direktori_reviu.id


    left join file_reviu
    on opd_dipilih.id_direktori = file_reviu.direktori_id AND opd_dipilih.id_instansi = file_reviu.unit_kerja_id
    
    where opd_dipilih.id_direktori = '`+req.body.id_direktori+`' and file_reviu.unit_kerja_id IS NULL;

`

    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})

router.post('/view2', (req, res)=> {


    // var instansi = ''


    // if (req.body.tipe==1) {
    //     instansi = ``
        
    // } else {
    //     instansi = `AND opd_dipilih.id_instansi = '`+req.body.id_instansi+`' `
    // }

    query = `
    
        
    SELECT opd_dipilih.*, direktori_reviu.uraian, direktori_reviu.keterangan,
    unit_kerja.unit_kerja as unit_kerja_uraian, direktori_reviu.tahun as tahun,
    (SELECT 
        COUNT(id)
        FROM file_reviu
        
        WHERE file_reviu.unit_kerja_id = opd_dipilih.id_instansi AND file_reviu.direktori_id = opd_dipilih.id_direktori 
    ) as jmlfile_reviu,

    (SELECT 
        COUNT(id)
        FROM file_reviu
        
        WHERE file_reviu.unit_kerja_id = opd_dipilih.id_instansi AND file_reviu.direktori_id = opd_dipilih.id_direktori AND file_reviu.status_wali = 0
    ) as jmlProses,

    (SELECT 
        COUNT(id)
        FROM file_reviu
        
        WHERE file_reviu.unit_kerja_id = opd_dipilih.id_instansi AND file_reviu.direktori_id = opd_dipilih.id_direktori AND file_reviu.status_wali = 1
    ) as jmlTerima,

    (SELECT 
        COUNT(id)
        FROM file_reviu
        
        WHERE file_reviu.unit_kerja_id = opd_dipilih.id_instansi AND file_reviu.direktori_id = opd_dipilih.id_direktori AND file_reviu.status_wali = 2
    ) as jmlTolak

    FROM trista_monev.opd_dipilih opd_dipilih 

    LEFT JOIN simpeg.instansi instansi
    ON opd_dipilih.id_instansi = instansi.id

    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON opd_dipilih.id_instansi = unit_kerja.id


    LEFT JOIN trista_monev.direktori_reviu direktori_reviu
    ON opd_dipilih.id_direktori = direktori_reviu.id

    WHERE opd_dipilih.id_direktori = '`+req.body.id+`'
    


`

    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})


router.post('/view1', (req, res)=> {

    var opd = ''

    if (req.body.level_users==1 || req.body.level_users==5 || req.body.level_users==6 || req.body.level_users==7 || req.body.level_users==8 || req.body.level_users==9 || req.body.level_users==10) {
        opd=``
    } else{
        opd=`AND opd_dipilih.id_instansi = '`+req.body.unit_kerja+`'`
    }

    query = `

    
    SELECT opd_dipilih.id_instansi, direktori_reviu.id, direktori_reviu.uraian as uraian, direktori_reviu.keterangan as keterangan,
    unit_kerja.unit_kerja as unit_kerja_uraian, direktori_reviu.tahun as tahun,

    (SELECT 
        COUNT(id)
        FROM file_reviu
        
        WHERE file_reviu.unit_kerja_id = opd_dipilih.id_instansi AND file_reviu.direktori_id = opd_dipilih.id_direktori 
    ) as proses
 
    FROM trista_monev.opd_dipilih opd_dipilih 

    LEFT JOIN simpeg.instansi instansi
    ON opd_dipilih.id_instansi = instansi.id

    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON opd_dipilih.id_instansi = unit_kerja.id

    LEFT JOIN trista_monev.direktori_reviu direktori_reviu
    ON opd_dipilih.id_direktori = direktori_reviu.id

    where opd_dipilih.id_direktori = '`+req.body.id_direktori+`'  `+opd+`


`

    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})


router.post('/editData', (req,res)=>{
    var id = uniqid()
    var data = req.body.form
    console.log(req.body.form);

    query = `

    UPDATE direktori_reviu SET

    uraian = '`+data.uraian+`',
    keterangan = '`+data.keterangan+`',
    daritgl = '`+data.daritgl+`',
    sampaitgl = '`+data.sampaitgl+`',
    tahun = '`+data.tahun.id+`',
    master_type_id = '`+data.master_type_id+`',
    editeBy = '`+req.user._id+`',
    editeAt = NOW()

    WHERE id = '`+data.id+`'
    `;

    db.query(query, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            res.send(row);
        }
    })

})

router.post('/iniview', (req, res) => {
    var data_batas = 8;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    var instansi = ''


    if (req.body.tipe==1) {
        instansi = `(direktori_reviu.master_type_id = 2 AND direktori_reviu.createBy = '`+ req.user._id +`')`
        
    } else {
        // instansi = `AND opd_dipilih.id_instansi = '`+req.body.id_instansi+`' `
        instansi = ` (
            (direktori_reviu.master_type_id  = 3 AND opd_dipilih.id_instansi = '`+ req.body.instansi_id +`') || 
            (direktori_reviu.master_type_id  = 2 AND opd_dipilih.id_instansi = '`+ req.body.instansi_id +`') ||
            (direktori_reviu.master_type_id  = 1 AND direktori_reviu.createBy = '`+ req.user._id +`')
        ) `

    }
    


    let jml_data = `
    SELECT
    direktori_reviu.*,
    unit_kerja.unit_kerja as unit_kerja_uraian,
    master_type.uraian as master_uraian,
    users.username as username
  

    FROM trista_monev.direktori_reviu direktori_reviu

    LEFT JOIN simpeg.unit_kerja unit_kerja
    ON direktori_reviu.unit_kerja_id = unit_kerja.id

    LEFT JOIN trista_monev.opd_dipilih opd_dipilih
    ON direktori_reviu.id = opd_dipilih.id_direktori

    LEFT JOIN trista_monev.master_type master_type
    ON direktori_reviu.master_type_id = master_type.id


    LEFT JOIN egov.users users
    ON users.id = direktori_reviu.createBy
    


    WHERE `+instansi+`
    
    AND

    direktori_reviu.uraian LIKE '%`+cari+`%'

    ORDER BY direktori_reviu.createAt DESC

    LIMIT `+data_star+`,`+data_batas+`

        
    `

    let view = `
        SELECT
        direktori_reviu.*,
        unit_kerja.unit_kerja as unit_kerja_uraian,
        master_type.uraian as master_uraian,
        users.username as username,
        
        (SELECT 
            COUNT(id)
            FROM file_reviu
            
            WHERE file_reviu.direktori_id = opd_dipilih.id_direktori AND file_reviu.status_wali = 0
        ) as jmlProses,
    
        (SELECT 
            COUNT(id)
            FROM file_reviu
            
            WHERE file_reviu.direktori_id = opd_dipilih.id_direktori AND file_reviu.status_wali = 1
        ) as jmlTerima,
    
        (SELECT 
            COUNT(id)
            FROM file_reviu
            
            WHERE file_reviu.direktori_id = opd_dipilih.id_direktori AND file_reviu.status_wali = 2
        ) as jmlTolak

        FROM trista_monev.direktori_reviu direktori_reviu

        LEFT JOIN simpeg.unit_kerja unit_kerja
        ON direktori_reviu.unit_kerja_id = unit_kerja.id

        LEFT JOIN trista_monev.opd_dipilih opd_dipilih
        ON direktori_reviu.id = opd_dipilih.id_direktori

        LEFT JOIN trista_monev.master_type master_type
        ON direktori_reviu.master_type_id = master_type.id


        LEFT JOIN egov.users users
        ON users.id = direktori_reviu.createBy
        


        WHERE `+instansi+`
        
        AND

        direktori_reviu.uraian LIKE '%`+cari+`%'

        ORDER BY direktori_reviu.createAt DESC

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

router.post('/removeData', (req, res)=> {
    var file = req.body.file
    hapus_file(file);

    var query = `
        DELETE FROM direktori_reviu WHERE id = '`+req.body.id+`';
    `;

    var opddipilih = `
        DELETE FROM opd_dipilih WHERE id_direktori = '`+req.body.id+`';
    `;

    var filex = `
        DELETE FROM file_reviu WHERE direktori_id = '`+req.body.id+`';
    `;

    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            db.query(opddipilih, (err, row)=>{
                if(err){
                    res.send(err);
                }else{
                    db.query(filex, (err, row)=>{
                        if(err){
                            res.send(err);
                        }else{
                            res.send(row);
                        }
                    });
                }
            });
        }
    });
})







router.post('/listdata', (req, res)=> {
    console.log('LIST');
    console.log(req.body);
    console.log(req.body.level_user);
    console.log('==========================');
    // select data berdasarkan opd dipilih == unitkerja di localstorage
    var query = ''
 

    var filteruk = ''

    if (req.body.uk==undefined || req.body.uk==null || req.body.uk=='' ){
        filteruk = ``
    }else{
        filteruk = `AND opd_dipilih.id_instansi = '`+req.body.uk+`'`
        query = `
        SELECT direktori_reviu.*
        
        
        FROM direktori_reviu
        
        LEFT JOIN trista_monev.opd_dipilih opd_dipilih
        ON direktori_reviu.id = opd_dipilih.id_direktori
        
        WHERE direktori_reviu.uraian LIKE '%`+req.body.cari+`%' `+filteruk+` 

    `;
        
    }
    
    var filter_mk = ''

    if (req.body.menu_klp==undefined || req.body.menu_klp==null || req.body.menu_klp=='' ){
        filter_mk = ``
    }else{
        filter_mk = `AND direktori_reviu.menu_klp = '`+req.body.menu_klp+`'`
        query = `
        SELECT direktori_reviu.*
        
        
        FROM direktori_reviu
        
 
        
        WHERE direktori_reviu.uraian LIKE '%`+req.body.cari+`%' `+filter_mk+`

    `;
        
    }
    
    
    
    
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})

router.post('/list', (req, res)=> {
    var file = req.body.file
    hapus_file(file);

    var query = `
        SELECT 
        id,
        uraian
        FROM direktori_reviu
        WHERE 
        direktori_reviu.uraian LIKE '%`+req.body.uraian+`%' AND
        unit_kerja_id = '`+req.body.unit_kerja_id+`'

        limit 20
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
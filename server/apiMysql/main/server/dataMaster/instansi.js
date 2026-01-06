const express = require('express');
var db = require('../../../../db/MySql/simpeg');
const router = express.Router();




router.post('/list', (req, res) => {

    console.log("MASTER INSTANSI DIPANGGIL");
    var userx = req.user.profile
    // console.log(userx); 

    var filter_akses = ''

    if (userx.akses_unit == 3) {
        // console.log("BISA AKSES SEMUA");
        filter_akses = ``
    } else {
        // console.log("TIDAK BISA AKSES SEMUA");
        filter_akses = `WHERE instansi.id = '`+userx.instansi_id+`'` ;
    }

    // console.log(filter_akses);
    
    let view = ` 
        SELECT * FROM instansi
        `+filter_akses+`

        ORDER BY instansi
    `;

    // console.log(view);

    db.query(view, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(row)
        }
    })
});



router.post('/filter', (req, res) => {

    


    
    let view = ` 
        SELECT * FROM instansi
 
    `;

    db.query(view, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(row)
        }
    })
});







module.exports = router;
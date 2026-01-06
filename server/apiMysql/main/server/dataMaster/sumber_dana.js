const express = require('express');
var db = require('../../../../db/MySql/umum');
const router = express.Router();




router.post('/list_autocomplete', (req, res) => {

    // console.log(req.body)

    var filterVal = ``

    if (req.body.val == undefined || req.body.val == null || req.body.val == '') {
        filterVal = ''
    } else {
        filterVal = `
        WHERE 
        master_sumber_dana.uraian LIKE '%`+req.body.val+`%'
        `
    }

    let view = ` 
        SELECT master_sumber_dana.* 
        FROM master_sumber_dana
        `+filterVal+`
        LIMIT 20

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



module.exports = router;
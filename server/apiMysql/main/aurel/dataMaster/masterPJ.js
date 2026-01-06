const express = require('express');
var db = require('../../../../db/MySql/trista_monev');
const router = express.Router();




router.get('/list', (req, res) => {
    // console.log(req.body)
    let view = ` 
        SELECT 
        master_pj.*
        FROM master_pj 
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
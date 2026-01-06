const express = require('express');
var db = require('../../../../db/MySql/umum');
const router = express.Router();




router.get('/list', (req, res) => {
    // console.log(req.body)
    let view = ` 
        SELECT 
        tahun.*
        FROM tahun 
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
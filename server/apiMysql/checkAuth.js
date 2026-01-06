const express = require('express');
const router = express.Router();

var db = require('../db/MySql/umum');
var dbs = require('../db/MySql/trista_monev');


router.post('/', (req, res)=>{
    // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA")
    res.send("OK")

})

router.get('/', (req, res)=>{
    // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA")
    res.json("OK")

})



router.post('/autocomplete_db', (req, res)=>{
    var query = `
        SELECT * FROM contoh_autocomplete
        WHERE contoh_autocomplete.uraian LIKE '%`+req.body.val+`%'

        LIMIT 2
    `

    db.query(query, (err, result)=>{
        if (err) {res.json(err)}
        else{
            res.json(result)
        }
    })

})

router.post('/tipe_akses', (req, res)=>{
    var query = `
        SELECT * FROM master_type
        WHERE master_type.uraian LIKE '%`+req.body.val+`%'

        LIMIT 3
    `

    dbs.query(query, (err, result)=>{
        if (err) {res.json(err)}
        else{
            res.json(result)
        }
    })

})

router.post('/jabatan', (req, res)=>{
    var query = `
        SELECT * FROM master_pj
        WHERE master_pj.uraian LIKE '%`+req.body.val+`%'
        LIMIT 3
    `

    db.query(query, (err, result)=>{
        if (err) {res.json(err)}
        else{
            res.json(result)
        }
    })

})







module.exports = router;

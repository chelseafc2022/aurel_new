

var db = require('../../db/MySql/umum');



const removeTagByid = async(id)=>{
    return new Promise((resolve, reject) => {
        var query = `
            DELETE FROM kegiatan_sub_tag WHERE id = '`+id+`';
        `;
        db.query(query, (err, row)=>{
            if(err){
                console.log(err);
            }else{
                resolve(row)
            }
        });
        
    })
}


const removeLabelByTag = async (kegiatan_sub_tag_id)=>{

    return new Promise((resolve, reject) => {
        var query = `
            DELETE FROM kegiatan_sub_label WHERE kegiatan_sub_tag_id = '`+kegiatan_sub_tag_id+`';
        `;
        db.query(query, (err, row)=>{
            if(err){
                console.log(err);
            }else{
                resolve(row)
            }
        });
        
    })
}




const removeRincianByLabel = (kegiatan_sub_label_id)=>{

    return new Promise((resolve, reject) => {
        
        var query = `
            DELETE FROM kegiatan_sub_rincian WHERE kegiatan_sub_label_id = '`+kegiatan_sub_label_id+`';
        `;
        db.query(query, (err, row)=>{
            if(err){
                console.log(err);
            }else{
                resolve(row)
            }
        });
    })

}




module.exports = {
    removeTagByid : removeTagByid,
    removeLabelByTag : removeLabelByTag,
    removeRincianByLabel : removeRincianByLabel,
}
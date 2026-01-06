const ViewKKSPPD = async (data, db) =>{

    return new Promise((resolve, reject) => {

        // var form = req.body.form

        let query = `
            SELECT 
            kk.*,
            realisasi_keuangan.uraian as bku_uraian,
            realisasi_keuangan.no as bku_no,
            realisasi_keuangan.keterangan as bku_keterangan,
            realisasi_keuangan_serapan.realisasi as bku_nilai_rincian_kegiatan,
            master_pph.uraian as master_pph_uraian,
            master_pph.nilai as master_pph_nilai,
            master_permintaan.jenis_permintaan as master_permintaan_uraian


            FROM monev_pembangunan.kk kk

            LEFT JOIN monev_pembangunan.realisasi_fisik realisasi_fisik
            ON realisasi_fisik.id = kk.realisasi_fisik_id

            LEFT JOIN monev_pembangunan.realisasi_keuangan_serapan realisasi_keuangan_serapan
            ON realisasi_keuangan_serapan.id = realisasi_fisik.realisasi_keuangan_serapan_id

            LEFT JOIN monev_pembangunan.realisasi_keuangan realisasi_keuangan
            ON realisasi_keuangan.id = realisasi_keuangan_serapan.realisasi_keuangan_id

            LEFT JOIN trista_monev.master_permintaan master_permintaan
            ON master_permintaan.id = realisasi_keuangan.master_permintaan

            LEFT JOIN trista_monev.master_pph master_pph
            ON master_pph.id = kk.master_pph


            WHERE kk.realisasi_fisik_id = `+data+`    
        `

        db.query(query, (err, row) => {
            if (err) {
                console.log('errrrooorrr');
                console.log(err);
                resolve(err);
            } else {
                // console.log(row);
                resolve(row[0]);
            }
        })

    })
}


const AddKKSPPD = (req, row, db) => {

    return new Promise((resolve, reject) => {

        var form = req.body.form

        console.log("==============");
        console.log(form);
        console.log("==============");

        let insert = `
            INSERT INTO kk (
                    
                realisasi_fisik_id,
                jns_realisasi,

                no,
                nilai,

                dari_tgl,
                sampai_tgl,
                penerima,
                nilai_harian,
                nilai_tiket_pergi,
                nilai_tiket_pulang,
                nilai_penginapan,
                nilai_airportex,
                representasi,
                realisasi_keuangan,
                selisih_realisasi,


                ppn,
                ppn_realisasi,
                master_pph,
                pph_nilai,
                pph_realisasi,
                createBy, 
                createAt
            )
            VALUES (
                `+row.insertId+`,
                `+form.jns_realisasi+`,

                '`+form.no+`',
                `+form.nilai+`,

                '`+form.dari_tgl+`',
                '`+form.sampai_tgl+`',
                '`+form.penerima+`',
                `+form.nilai_harian+`,
                `+form.nilai_tiket_pergi+`,
                `+form.nilai_tiket_pulang+`,
                `+form.nilai_penginapan+`,
                `+form.nilai_airportex+`,
                `+form.representasi+`,
                `+form.realisasi_keuangan+`,
                `+form.selisih_realisasi+`,


                `+form.ppn+`,
                `+form.ppn_realisasi+`,
                `+form.master_pph+`,
                `+form.pph_nilai+`,
                `+form.pph_realisasi+`,
                '`+req.user._id+`',
                NOW()
            )
        `

        db.query(insert, (err, row) => {
            if (err) {
                console.log('errrrooorrr');
                console.log(err);
                resolve(err);
            } else {
                // console.log(row);
                resolve(row);
            }
        })

    })
}

const EditKKSPPD =(req, row, db) => {

    return new Promise((resolve, reject) => {

        var form = req.body.form

        console.log(form);



        var query = `
            UPDATE kk SET

            realisasi_fisik_id = `+form.realisasi_fisik_id+`,
            jns_realisasi = `+form.jns_realisasi+`,


            no = '`+form.no+`',
            nilai = `+form.nilai+`,

            dari_tgl = '`+form.dari_tgl+`',
            sampai_tgl = '`+form.sampai_tgl+`',
            penerima = '`+form.penerima+`',
            nilai_harian = `+form.nilai_harian+`,
            nilai_tiket_pergi = `+form.nilai_tiket_pergi+`,
            nilai_tiket_pulang = `+form.nilai_tiket_pulang+`,
            nilai_penginapan = `+form.nilai_penginapan+`,
            nilai_airportex = `+form.nilai_airportex+`,
            representasi = `+form.representasi+`,
            realisasi_keuangan = `+form.realisasi_keuangan+`,
            selisih_realisasi = `+form.selisih_realisasi+`,

            ppn = `+form.ppn+`,
            ppn_realisasi = `+form.ppn_realisasi+`,
            master_pph = `+form.master_pph+`,
            pph_nilai = `+form.pph_nilai+`,
            pph_realisasi = `+form.pph_realisasi+`


            WHERE id = '`+form.id+`' 
        `;

        db.query(query, (err, row)=>{
            if(err) {
                console.log(err);
                resolve(err);
            }else{
                resolve(row);
            }
        }) 
    })
}




const removeKKSPPD = (req, db) =>{

    return new Promise((resolve, reject) => {

        var query = `
            DELETE FROM kk WHERE realisasi_fisik_id = `+req.body.id+`;
        `;
        db.query(query, (err, row)=>{
            if(err){
                resolve(err);
            }else{
                resolve(row);
            }
        });

        
    })
}

module.exports = {
    ViewKKSPPD : ViewKKSPPD,
    AddKKSPPD : AddKKSPPD,
    EditKKSPPD : EditKKSPPD,
    removeKKSPPD : removeKKSPPD,
}
const express = require('express');
// const volleyball = require('volleyball');
const cors = require('cors');
var path = require("path");

require('dotenv').config();



const app = express();

const middleware = require('./auth/middlewares');
const auth = require('./auth');


// app.use(volleyball);

app.use(cors({
  // origin : 'http://localhost:8081'
  origin : '*'
}));
app.use(express.json());

app.use(middleware.checkTokenSeetUser);


app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨Hello pengunjung,,, Anda mengunjugi alamat yg salah... mungkin maksud anda http://konaweselatankab.go.id ! 🌈✨🦄',
    user : req.user
  });
});


app.use('/auth', auth);
app.use('/uploads', express.static(path.join(__dirname, './uploads')))

    // ================================== BATAS =====================================================


      const test_connections = require('./apiMysql/main/test_connections');
      app.use('/api/v1/test_connections', middleware.isLoggedIn, test_connections);

    
    // =================== SERVER =====================




    const dm_menuList = require('./apiMysql/main/server/dataMaster/authorization/menuList');
    app.use('/api/v1/dm_menuList', middleware.isLoggedIn, middleware.sideMenuMidleware, dm_menuList);

    const dm_kelompokUsers = require('./apiMysql/main/server/dataMaster/authorization/kelompokUsers');
    app.use('/api/v1/dm_kelompokUsers', middleware.isLoggedIn, middleware.sideMenuMidleware, dm_kelompokUsers);
    const dm_registrasi = require('./apiMysql/main/server/dataMaster/authorization/registrasi');
    app.use('/api/v1/dm_registrasi', middleware.isLoggedIn, middleware.sideMenuMidleware, dm_registrasi);
    const dm_unitKerja = require('./apiMysql/main/server/dataMaster/unitKerja');
    app.use('/api/v1/dm_unitKerja', middleware.isLoggedIn, dm_unitKerja);
    const dm_unitKerjaKode = require('./apiMysql/main/server/dataMaster/unitKerjaKode');
    app.use('/api/v1/dm_unitKerjaKode', middleware.isLoggedIn, dm_unitKerjaKode);
    const dm_instansi = require('./apiMysql/main/server/dataMaster/instansi');
    app.use('/api/v1/dm_instansi', middleware.isLoggedIn, dm_instansi);
    const dm_urusan = require('./apiMysql/main/server/dataMaster/urusan');
    app.use('/api/v1/dm_urusan', middleware.isLoggedIn, dm_urusan);
    const dm_tahun = require('./apiMysql/main/server/dataMaster/tahun');
    app.use('/api/v1/dm_tahun', middleware.isLoggedIn, dm_tahun);
    const dm_master_permintaan = require('./apiMysql/main/server/dataMaster/master_permintaan');
    app.use('/api/v1/dm_master_permintaan', middleware.isLoggedIn, dm_master_permintaan);
    const dm_sumber_dana = require('./apiMysql/main/server/dataMaster/sumber_dana');
    app.use('/api/v1/dm_sumber_dana', middleware.isLoggedIn, dm_sumber_dana);

    const dm_urusan_bidang = require('./apiMysql/main/server/dataMaster/urusan_bidang');
    app.use('/api/v1/dm_urusan_bidang', middleware.isLoggedIn, dm_urusan_bidang);

    const dm_program = require('./apiMysql/main/server/dataMaster/program');
    app.use('/api/v1/dm_program', middleware.isLoggedIn, dm_program);
    const dm_kegiatan = require('./apiMysql/main/server/dataMaster/kegiatan');
    app.use('/api/v1/dm_kegiatan', middleware.isLoggedIn, dm_kegiatan);
    const kegiatan_sub = require('./apiMysql/main/server/dataMaster/kegiatan_sub');
    app.use('/api/v1/kegiatan_sub', middleware.isLoggedIn, kegiatan_sub);
    

    const dm_biodata = require('./apiMysql/main/server/dataMaster/biodata');
    app.use('/api/v1/dm_biodata', middleware.isLoggedIn, dm_biodata);



    const checkAuth = require('./apiMysql/checkAuth');
    app.use('/api/v1/checkAuth', middleware.isLoggedIn, checkAuth);



      // +++++++++++++++ UPDATE +++++++++++++++
      // +++++++++++++++ UPDATE +++++++++++++++



    // =================== SERVER =====================

    // =================== CLIENT =====================

      const client_lampiranImg = require('./apiMysql/main/client/Lampiran/lampiranImg');
      app.use('/api/v1/client_lampiranImg', middleware.isLoggedIn, client_lampiranImg);

      const ct_program = require('./apiMysql/main/server/program_kegiatan/program');
      app.use('/api/v1/ct_program', middleware.isLoggedIn, ct_program);
      // app.use('/api/v1/ct_program', ct_program);

      const ct_kegiatan = require('./apiMysql/main/server/program_kegiatan/kegiatan');
      app.use('/api/v1/ct_kegiatan', middleware.isLoggedIn, ct_kegiatan);
      // app.use('/api/v1/ct_kegiatan', ct_kegiatan);

      const ct_kegiatan_sub = require('./apiMysql/main/server/program_kegiatan/kegiatan_sub');
      // app.use('/api/v1/ct_kegiatan_sub', middleware.isLoggedIn  , ct_kegiatan_sub);
      app.use('/api/v1/ct_kegiatan_sub', ct_kegiatan_sub);

      const ct_kegiatan_sub_tag = require('./apiMysql/main/server/program_kegiatan/kegiatan_sub_tag');
      app.use('/api/v1/ct_kegiatan_sub_tag', middleware.isLoggedIn, ct_kegiatan_sub_tag);
      const ct_kegiatan_sub_label = require('./apiMysql/main/server/program_kegiatan/kegiatan_sub_label');
      app.use('/api/v1/ct_kegiatan_sub_label', middleware.isLoggedIn, ct_kegiatan_sub_label);
      const ct_kegiatan_sub_rincian = require('./apiMysql/main/server/program_kegiatan/kegiatan_sub_rincian');
      app.use('/api/v1/ct_kegiatan_sub_rincian', middleware.isLoggedIn, ct_kegiatan_sub_rincian);
      const ct_kegiatan_sub_rincian_new = require('./apiMysql/main/server/program_kegiatan/kegiatan_sub_rincian_new');
      app.use('/api/v1/ct_kegiatan_sub_rincian_new', middleware.isLoggedIn, ct_kegiatan_sub_rincian_new);
      
      const ct_target_keuangan = require('./apiMysql/main/server/target/target_keuangan');
      app.use('/api/v1/ct_target_keuangan', middleware.isLoggedIn, ct_target_keuangan);
      const ct_target_fisik = require('./apiMysql/main/server/target/target_fisik');
      app.use('/api/v1/ct_target_fisik', middleware.isLoggedIn, ct_target_fisik);

      const ct_realiasi_fisik = require('./apiMysql/main/server/realisasi/realiasi_fisik');
      // app.use('/api/v1/ct_realiasi_fisik', middleware.isLoggedIn, ct_realiasi_fisik);
      app.use('/api/v1/ct_realiasi_fisik', ct_realiasi_fisik);
      const ct_realiasi_keuangan = require('./apiMysql/main/server/realisasi/realiasi_keuangan');
      app.use('/api/v1/ct_realiasi_keuangan', middleware.isLoggedIn, ct_realiasi_keuangan);
      const ct_realiasi_keuangan_serapan = require('./apiMysql/main/server/realisasi/realiasi_keuangan_serapan');
      app.use('/api/v1/ct_realiasi_keuangan_serapan', middleware.isLoggedIn, ct_realiasi_keuangan_serapan);

      const ct_target_pembangunan = require('./apiMysql/main/server/pembangunan/target_pembangunan');
      app.use('/api/v1/ct_target_pembangunan', middleware.isLoggedIn, ct_target_pembangunan);
      // app.use('/api/v1/ct_target_pembangunan', ct_target_pembangunan);
      const ct_realisasi_pembangunan = require('./apiMysql/main/server/pembangunan/realisasi_pembangunan');
      app.use('/api/v1/ct_realisasi_pembangunan', middleware.isLoggedIn, ct_realisasi_pembangunan);
      // app.use('/api/v1/ct_realisasi_pembangunan', ct_realisasi_pembangunan);


      const ct_lampiran = require('./apiMysql/main/server/lampiran/lampiran');
      app.use('/api/v1/ct_lampiran', middleware.isLoggedIn, ct_lampiran);

      const rekening = require('./apiMysql/main/aurel/kertasKerja/rekening');
      app.use('/api/v1/rekening', middleware.isLoggedIn, rekening);
      const bku = require('./apiMysql/main/aurel/kertasKerja/bku');
      app.use('/api/v1/bku', middleware.isLoggedIn, bku);
      const kka_kontrak = require('./apiMysql/main/aurel/kertasKerja/kka_kontrak');
      app.use('/api/v1/kka_kontrak', middleware.isLoggedIn, kka_kontrak);
      const kka_hibah = require('./apiMysql/main/aurel/kertasKerja/kka_hibah');
      app.use('/api/v1/kka_hibah', middleware.isLoggedIn, kka_hibah);
      const kka_sppd = require('./apiMysql/main/aurel/kertasKerja/kka_sppd');
      app.use('/api/v1/kka_sppd', middleware.isLoggedIn, kka_sppd);
      const kka_adm = require('./apiMysql/main/aurel/kertasKerja/kka_adm');
      app.use('/api/v1/kka_adm', middleware.isLoggedIn, kka_adm);
      const saldo = require('./apiMysql/main/aurel/kertasKerja/saldo');
      app.use('/api/v1/saldo', middleware.isLoggedIn, saldo);

    // =================== CLIENT =====================
    // =================== MONEP MOBILE =====================
      const spt = require('./apiMysql/main/server/spt/spt');
      app.use('/api/v1/spt', middleware.isLoggedIn, spt);
      const lhp = require('./apiMysql/main/server/lhp/lhp');
      app.use('/api/v1/lhp', middleware.isLoggedIn, lhp);



    // =================== MONEP MOBILE =====================







    // =================== AUREL =====================

      const direktorireviu = require('./apiMysql/main/aurel/reviu/direktorireviu');
      app.use('/api/v1/direktorireviu', middleware.isLoggedIn, direktorireviu);
      const filereviu = require('./apiMysql/main/aurel/reviu/filereviu');
      app.use('/api/v1/filereviu', middleware.isLoggedIn, filereviu);
      const kkr = require('./apiMysql/main/aurel/reviu/kkr');
      app.use('/api/v1/kkr', middleware.isLoggedIn, kkr);
      const publishLhr = require('./apiMysql/main/aurel/reviu/publishLhr');
      app.use('/api/v1/publishLhr', middleware.isLoggedIn, publishLhr);
      const reviuLhr = require('./apiMysql/main/aurel/reviu/reviuLhr');
      app.use('/api/v1/reviuLhr', middleware.isLoggedIn, reviuLhr);

      const masterPPH = require('./apiMysql/main/aurel/dataMaster/masterPPH');
      app.use('/api/v1/masterPPH', middleware.isLoggedIn, masterPPH);
      const masterPJ = require('./apiMysql/main/aurel/dataMaster/masterPJ');
      app.use('/api/v1/masterPJ', middleware.isLoggedIn, masterPJ);
      // const masterPPH = require('./apiMysql/main/aurel/dataMaster/masterPPH');
      // app.use('/api/v1/masterPPH', middleware.isLoggedIn, masterPPH);


      const dpa = require('./apiMysql/main/aurel/dpa');
      app.use('/api/v1/dpa', middleware.isLoggedIn, dpa);
      const lra = require('./apiMysql/main/aurel/lra');
      app.use('/api/v1/lra', middleware.isLoggedIn, lra);
      const lpj = require('./apiMysql/main/aurel/lpj');
      app.use('/api/v1/lpj', middleware.isLoggedIn, lpj);
      const BKU_NEW = require('./apiMysql/main/aurel/bku_new');
      app.use('/api/v1/bku_new', middleware.isLoggedIn, BKU_NEW);
      const REK = require('./apiMysql/main/aurel/rek_koran');
      app.use('/api/v1/rek_koran', middleware.isLoggedIn, REK);
      const rekonPajak = require('./apiMysql/main/aurel/rekonPajak');
      app.use('/api/v1/rekonPajak', middleware.isLoggedIn, rekonPajak);
      const register = require('./apiMysql/main/aurel/register');
      app.use('/api/v1/register', middleware.isLoggedIn, register);




    // =================== AUREL =====================


var aa = 12
var bb = 'Asrif'


    
    // ================================== BATAS =====================================================
    
    // >>>>>>> d3108e8369f9f0f379270f0f6f53f5b9ef7abde6
    
    // const checkAbsenOtomatis = require('./apiMysql/library/checkAbsenOtomatis');
    // checkAbsenOtomatis.checkKehadiranOtomatis();

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found data - ' + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandler);

// const port = process.env.PORT || 5035;
const port = process.env.PORT || 5071;
const server = app.listen(port, '0.0.0.0', () => {
  console.log('Listening on port', port);
});
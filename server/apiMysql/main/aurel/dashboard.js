const express = require('express');
var db = require('../../../db/MySql/umum');
const router = express.Router();

router.post('/opdDashboard', (req, res) => {
    const tahun = req.body.tahun;

    if (!tahun) {
        return res.status(400).json({ message: 'Tahun wajib diisi' });
    }

    // 1. Total OPD
    const totalOpdQuery = `
        SELECT COUNT(*) AS total_opd
        FROM simpeg.unit_kerja
        WHERE status = 1
            AND (
            unit_kerja LIKE 'DINAS%'
            OR unit_kerja LIKE 'BADAN%'
            OR unit_kerja LIKE 'BAGIAN%'
            OR unit_kerja LIKE 'INSPEKTORAT%'
            )
        `;


    // 2. OPD Sudah Upload (distinct unit kerja)
    const opdUploadQuery = `
        SELECT COUNT(DISTINCT dpa.unit_kerja) AS opd_sudah_upload
        FROM dpa
        JOIN simpeg.unit_kerja uk ON dpa.unit_kerja = uk.id
        WHERE dpa.tahun = ?
            AND uk.status = 1
            AND (
            uk.unit_kerja LIKE 'DINAS%'
            OR uk.unit_kerja LIKE 'BADAN%'
            OR uk.unit_kerja LIKE 'BAGIAN%'
            OR uk.unit_kerja LIKE 'INSPEKTORAT%'
            )
        `;


    db.query(totalOpdQuery, (err, totalResult) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        const total_opd = totalResult[0].total_opd;

        db.query(opdUploadQuery, [tahun], (err2, uploadResult) => {
            if (err2) {
                console.error(err2);
                return res.status(500).json(err2);
            }

            const opd_sudah_upload = uploadResult[0].opd_sudah_upload;
            const opd_belum_upload = total_opd - opd_sudah_upload;

            res.json({
                tahun: tahun,
                total_opd: total_opd,
                opd_sudah_upload: opd_sudah_upload,
                opd_belum_upload: opd_belum_upload
            });
        });
    });
});

router.post('/menu-drilldown', async (req, res) => {
    const tahun = req.body.tahun;
    if (!tahun) return res.status(400).json({ message: 'tahun wajib' });

    const menus = [
        { key: 'DPA', table: 'dpa' },
        { key: 'LPJ', table: 'lpj' },
        { key: 'LRA', table: 'lra' },
      
        // REGISTER TURUNAN
        { key: 'SPP', table: 'register', type: 'SPP' },
        { key: 'SPM', table: 'register', type: 'SPM' },
        { key: 'SP2D', table: 'register', type: 'SP2D' },
      
        { key: 'REKON PAJAK', table: 'rekonPajak' },
        { key: 'REKON KORAN', table: 'rek_koran' }
      ];

    let seriesData = [];
    let drilldownSeries = [];

    for (const m of menus) {

        // LEVEL 1
        const countQuery = `
            SELECT COUNT(DISTINCT t.unit_kerja) AS total
            FROM ${m.table} t
            JOIN simpeg.unit_kerja uk ON t.unit_kerja = uk.id
            WHERE t.tahun = ?
            AND uk.status = 1
        `;

        const total = await new Promise((resolve, reject) => {
            db.query(countQuery, [tahun], (e, r) => {
                if (e) reject(e);
                else resolve(r[0].total);
            });
        });

        seriesData.push({
            name: m.label,
            y: total,
            drilldown: m.key
        });

        // LEVEL 2
        const detailQuery = `
            SELECT uk.unit_kerja, COUNT(*) AS jml
            FROM ${m.table} t
            JOIN simpeg.unit_kerja uk ON t.unit_kerja = uk.id
            WHERE t.tahun = ?
            AND uk.status = 1
            GROUP BY t.unit_kerja
        `;

        const detail = await new Promise((resolve, reject) => {
            db.query(detailQuery, [tahun], (e, r) => {
                if (e) reject(e);
                else resolve(r.map(x => [x.unit_kerja, x.jml]));
            });
        });

        drilldownSeries.push({
            id: m.key,
            name: `Detail ${m.label}`,
            data: detail
        });
    }

    res.json({
        series: [{
            name: 'Menu',
            colorByPoint: true,
            data: seriesData
        }],
        drilldown: {
            series: drilldownSeries
        }
    });
});

router.post('/heatmap-opd', async (req, res) => {
    try {
      const { tahun } = req.body;
      if (!tahun) {
        return res.status(400).json({ message: 'tahun wajib diisi' });
      }
  
      // ===============================
      // DEFINISI MENU & TABEL
      // ===============================
      const MENUS = [
        { key: 'DPA', table: 'dpa' },
        { key: 'LPJ', table: 'lpj' },
        { key: 'LRA', table: 'lra' },
      
        // REGISTER TURUNAN
        { key: 'SPP', table: 'register', type: 'SPP' },
        { key: 'SPM', table: 'register', type: 'SPM' },
        { key: 'SP2D', table: 'register', type: 'SP2D' },
      
        { key: 'REKON PAJAK', table: 'rekonPajak' },
        { key: 'REKENING KORAN', table: 'rek_koran' }
      ];
  
      const opdList = await new Promise((resolve, reject) => {
        db.query(
          `
          SELECT id, unit_kerja
            FROM simpeg.unit_kerja
            WHERE status = 1
            AND (
            unit_kerja LIKE '%DINAS%'
            OR unit_kerja LIKE '%BADAN%'
            OR unit_kerja LIKE '%BAGIAN%'
            OR unit_kerja LIKE '%INSPEKTORAT%'
            )
            ORDER BY unit_kerja ASC

          `,
          (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          }
        );
      });
  
      let result = [];
  
      for (const opd of opdList) {
        let status = {};
        let score = 0;
  
        // LOOP MENU
        for (const m of MENUS) {
            const exists = await new Promise((resolve, reject) => {
              let sql = `
                SELECT 1
                FROM ${m.table}
                WHERE tahun = ?
                AND unit_kerja = ?
              `;
          
              let params = [tahun, opd.id];
          
              // KHUSUS REGISTER (SPP / SPM / SP2D)
              if (m.type) {
                sql += ` AND jenis_register = ?`;
                params.push(m.type);
              }
          
              sql += ` LIMIT 1`;
          
              db.query(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows.length > 0);
              });
            });
          
            status[m.key] = exists;
            if (exists) score++;
          }
          
  
        result.push({
          opd: opd.unit_kerja,
          score: score,
          status: status
        });
      }
  
      result.sort((a, b) => b.score - a.score);
  
      res.json({
        tahun: tahun,
        menus: MENUS.map(m => m.key),
        data: result
      });
  
    } catch (err) {
      console.error('ERROR heatmap-opd:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


module.exports = router;

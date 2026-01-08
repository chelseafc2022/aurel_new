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
    `;

    // 2. OPD Sudah Upload (distinct unit kerja)
    const opdUploadQuery = `
        SELECT COUNT(DISTINCT dpa.unit_kerja) AS opd_sudah_upload
        FROM dpa
        JOIN simpeg.unit_kerja uk ON dpa.unit_kerja = uk.id
        WHERE dpa.tahun = ?
        AND uk.status = 1
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
        { key: 'dpa', label: 'DPA', table: 'dpa' },
        { key: 'lpj', label: 'LPJ', table: 'lpj' },
        { key: 'lra', label: 'LRA', table: 'lra' },
        { key: 'register', label: 'REGISTER', table: 'register' },
        { key: 'rekonPajak', label: 'REKON PAJAK', table: 'rekonPajak' },
        { key: 'rek_koran', label: 'REKON KORAN', table: 'rek_koran' }
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


module.exports = router;

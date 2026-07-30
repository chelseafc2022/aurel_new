const express = require('express');
var db = require('../../../db/MySql/umum');
const router = express.Router();

// GET ALL DOCUMENTS FOR APPROVAL PENDING / APPROVED / REJECTED
router.post('/list-dokumen', async (req, res) => {
    try {
        const { tahun, status_approval, unit_kerja, menu_key } = req.body;
        const thn = tahun || new Date().getFullYear();

        const MENUS = [
            { key: 'BKU', table: 'bku_new' },
            { key: 'DPA', table: 'dpa' },
            { key: 'LPJ', table: 'lpj' },
            { key: 'LRA', table: 'lra' },
            { key: 'SPP', table: 'register', type: 'SPP' },
            { key: 'SPM', table: 'register', type: 'SPM' },
            { key: 'SP2D', table: 'register', type: 'SP2D' },
            { key: 'REKON PAJAK', table: 'rekonPajak' },
            { key: 'REKENING KORAN', table: 'rek_koran' }
        ];

        let targetMenus = MENUS;
        if (menu_key) {
            targetMenus = MENUS.filter(m => m.key === menu_key);
        }

        let unionQueries = [];
        let params = [];

        for (const m of targetMenus) {
            let whereClause = `t.tahun = ?`;
            params.push(thn);

            if (status_approval !== undefined && status_approval !== null && status_approval !== '') {
                whereClause += ` AND COALESCE(t.status_approval, 0) = ?`;
                params.push(Number(status_approval));
            }

            if (unit_kerja) {
                whereClause += ` AND t.unit_kerja = ?`;
                params.push(unit_kerja);
            }

            if (m.type) {
                whereClause += ` AND t.jenis_register = ?`;
                params.push(m.type);
            }

            unionQueries.push(`
                SELECT 
                    '${m.key}' AS menu_key,
                    '${m.table}' AS table_name,
                    t.id,
                    t.unit_kerja,
                    uk.unit_kerja AS unit_kerja_nama,
                    t.tahun,
                    COALESCE(t.nama_file, CONCAT('${m.key} - ', t.tahun)) AS nama_file,
                    COALESCE(t.keterangan, '') AS keterangan,
                    t.file,
                    COALESCE(t.file_type, 'application/pdf') AS file_type,
                    COALESCE(t.status_approval, 0) AS status_approval,
                    t.catatan_revisi,
                    t.verified_by,
                    t.verified_at,
                    t.createAt
                FROM ${m.table} t
                LEFT JOIN simpeg.unit_kerja uk ON t.unit_kerja = uk.id
                WHERE ${whereClause}
            `);
        }

        const fullSql = unionQueries.join(' UNION ALL ') + ' ORDER BY createAt DESC';

        db.query(fullSql, params, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error database', error: err });
            }
            res.json({ data: rows || [] });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// ACTION VERIFY DOCUMENT (APPROVE OR REJECT)
router.post('/verify-dokumen', (req, res) => {
    const { table_name, id, status_approval, catatan_revisi } = req.body;
    const verified_by = req.user ? req.user.username : 'inspektorat';

    const allowedTables = ['bku_new', 'dpa', 'lpj', 'lra', 'register', 'rekonPajak', 'rek_koran'];
    if (!allowedTables.includes(table_name)) {
        return res.status(400).json({ message: 'Tabel tidak valid' });
    }

    const query = `
        UPDATE ${table_name}
        SET status_approval = ?, catatan_revisi = ?, verified_by = ?, verified_at = NOW()
        WHERE id = ?
    `;

    db.query(query, [status_approval, catatan_revisi || null, verified_by, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Gagal verifikasi dokumen' });
        }
        res.json({ message: 'Berhasil memverifikasi dokumen', status_approval });
    });
});

module.exports = router;

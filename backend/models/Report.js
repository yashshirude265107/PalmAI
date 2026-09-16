const db = require("../config/db");

class Report {

    static create(data) {

        const stmt = db.prepare(`
            INSERT INTO reports (
                user_id,
                palmImageUrl,
                handSide,
                report,
                analysisScore,
                status
            )
            VALUES (?,?,?,?,?,?)
        `);

        const result = stmt.run(
            data.user_id,
            data.palmImageUrl,
            data.handSide || "unspecified",
            JSON.stringify(data),
            data.analysisScore || 0,
            data.status || "completed"
        );

        return {
            id: result.lastInsertRowid,
            ...data
        };
    }

    static findById(id) {

        const row = db.prepare(`
            SELECT *
            FROM reports
            WHERE id = ?
        `).get(id);

        if (!row) return null;

        return {
            ...JSON.parse(row.report),
            id: row.id,
            user_id: row.user_id,
            palmImageUrl: row.palmImageUrl,
            handSide: row.handSide,
            analysisScore: row.analysisScore,
            status: row.status,
            created_at: row.created_at
        };
    }

    static findByUser(userId) {

        const rows = db.prepare(`
            SELECT *
            FROM reports
            WHERE user_id = ?
            ORDER BY created_at DESC
        `).all(userId);

        return rows.map(r => ({
            ...JSON.parse(r.report),
            id: r.id,
            user_id: r.user_id,
            palmImageUrl: r.palmImageUrl,
            handSide: r.handSide,
            analysisScore: r.analysisScore,
            status: r.status,
            created_at: r.created_at
        }));
    }

    static findByUserPaged(userId, limit, offset) {

        const rows = db.prepare(`
            SELECT *
            FROM reports
            WHERE user_id = ?
            ORDER BY created_at DESC
            LIMIT ?
            OFFSET ?
        `).all(userId, limit, offset);

        return rows.map(r => ({
            ...JSON.parse(r.report),
            id: r.id,
            user_id: r.user_id,
            palmImageUrl: r.palmImageUrl,
            handSide: r.handSide,
            analysisScore: r.analysisScore,
            status: r.status,
            created_at: r.created_at
        }));
    }

    static countByUser(userId) {

        const row = db.prepare(`
            SELECT COUNT(*) AS total
            FROM reports
            WHERE user_id = ?
        `).get(userId);

        return row.total;
    }

    static delete(id) {

        return db.prepare(`
            DELETE FROM reports
            WHERE id = ?
        `).run(id);
    }

}

module.exports = Report;
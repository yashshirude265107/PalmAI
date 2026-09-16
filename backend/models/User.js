const bcrypt = require("bcryptjs");
const db = require("../config/db");

class User {

    // Create User
    static async create({ name, email, password }) {

        const hash = await bcrypt.hash(password, 10);

        const stmt = db.prepare(`
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `);

        const result = stmt.run(
            name,
            email.toLowerCase(),
            hash
        );

        return {
            id: result.lastInsertRowid,
            name,
            email: email.toLowerCase(),
            avatar: "",
            role: "user"
        };
    }

    // Find User By Email
    static findOne(email) {

        return db.prepare(`
            SELECT *
            FROM users
            WHERE email = ?
        `).get(email.toLowerCase());

    }

    // Find User By Id
    static findById(id) {

        return db.prepare(`
            SELECT *
            FROM users
            WHERE id = ?
        `).get(id);

    }

    // Compare Password
    static async comparePassword(password, hash) {

        return bcrypt.compare(password, hash);

    }

    // Update Profile
    static updateProfile(id, name, avatar = "") {

        db.prepare(`
            UPDATE users
            SET
                name = ?,
                avatar = ?
            WHERE id = ?
        `).run(name, avatar, id);

        return this.findById(id);

    }

}

module.exports = User;
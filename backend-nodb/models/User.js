const bcrypt = require("bcryptjs");
const { db, persist, generateId } = require("../lib/store");

/**
 * Attaches instance-style methods (comparePassword, save) to a plain user
 * object, so controllers written against Mongoose's API (`user.save()`,
 * `user.comparePassword(pw)`) keep working unchanged.
 */
function attachMethods(user) {
  if (!user) return null;

  user.comparePassword = async function (candidatePassword) {
    if (!this.password) return false;
    return bcrypt.compare(candidatePassword, this.password);
  };

  user.save = async function () {
    // If the password field looks unhashed (plain text was assigned directly),
    // hash it now — mirrors Mongoose's pre("save") hook behavior.
    if (this.password && !this.password.startsWith("$2")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    const idx = db.users.findIndex((u) => u._id === this._id);
    if (idx !== -1) db.users[idx] = { ...this };
    persist();
    return this;
  };

  return user;
}

function matches(user, query) {
  return Object.entries(query).every(([key, value]) => user[key] === value);
}

const User = {
  async create({ name, email, password, googleId, avatar, isVerified }) {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    const user = {
      _id: generateId(),
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      googleId: googleId || null,
      avatar: avatar || "",
      role: "user",
      isVerified: !!isVerified,
      resetPasswordToken: undefined,
      resetPasswordExpire: undefined,
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
    persist();
    return attachMethods({ ...user });
  },

  findOne(query) {
    const normalized = { ...query };
    if (normalized.email) normalized.email = normalized.email.toLowerCase().trim();
    const found = db.users.find((u) => matches(u, normalized));
    return attachMethods(found ? { ...found } : null);
  },

  findById(id) {
    const found = db.users.find((u) => u._id === id);
    return attachMethods(found ? { ...found } : null);
  },

  /** Finds a user by a hashed reset token that hasn't expired yet. */
  findByResetToken(hashedToken) {
    const found = db.users.find(
      (u) => u.resetPasswordToken === hashedToken && u.resetPasswordExpire && u.resetPasswordExpire > Date.now()
    );
    return attachMethods(found ? { ...found } : null);
  },
};

module.exports = User;

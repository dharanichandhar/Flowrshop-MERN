function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").toLowerCase());
}

function isStrongPassword(p) {
  // minimal: 6 chars
  return typeof p === "string" && p.length >= 6;
}

module.exports = { isEmail, isStrongPassword };
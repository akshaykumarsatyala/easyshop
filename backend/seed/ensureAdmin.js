const User = require("../models/User");

// Runs once on server start. If no admin account exists yet, it creates one
// using the ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME values from .env.
// This is what lets you log in to /admin/login the very first time,
// with no manual database work.
async function ensureAdminExists() {
  const existingAdmin = await User.findOne({ role: "admin" });
  if (existingAdmin) return;

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Site Admin";

  if (!email || !password) {
    console.warn(
      "No admin account exists yet, and ADMIN_EMAIL/ADMIN_PASSWORD are not set in .env. " +
      "Add them and restart the server to auto-create your first admin login."
    );
    return;
  }

  await User.create({ name, email, password, role: "admin" });
  console.log(`First admin account created -> email: ${email}`);
  console.log("Log in to the admin panel at /admin/login with this email and password.");
  console.log("Change this password after your first login, or update .env and restart before going live.");
}

module.exports = ensureAdminExists;

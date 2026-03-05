const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

async function seedAdmins() {
  await connectDB();

  const admins = [
    { email: "dharaniv2308@gmail.com", password: "Dharani@2308", name: "Admin 1" },
    { email: "kaviyarasumca2024@gmail.com", password: "Kavi@1234", name: "Admin 2" }
  ];

  for (const a of admins) {
    const exists = await User.findOne({ email: a.email });
    if (!exists) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(a.password, salt);

      await User.create({
        name: a.name,
        email: a.email,
        password: hash,
        role: "admin"
      });

      console.log(` Seeded admin: ${a.email}`);
    } else {
      console.log(`ℹ Admin already exists: ${a.email}`);
    }
  }

  console.log(" Admin seeding done.");
  process.exit(0);
}

seedAdmins().catch((e) => {
  console.error("Seed error:", e);
  process.exit(1);
});
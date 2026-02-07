const Admin = require("../models/Admin");

const createAdminIfNotExists = async () => {
  try {
    const adminExists = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (adminExists) {
      console.log("Admin already exists");
      return;
    }

    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });

    console.log("Admin user created successfully");
  } catch (err) {
    console.error("Error creating admin:", err);
  }
};

module.exports = createAdminIfNotExists;

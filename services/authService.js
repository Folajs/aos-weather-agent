const bcrypt = require("bcryptjs");

const admins = [
  {
    id: 1,
    email: "admin@example.com",

    // password = admin123
    password:
      bcrypt.hashSync(
        "admin123",
        10
      ),

    name: "System Admin"
  }
];

async function loginAdmin(
  email,
  password
) {

  const admin =
    admins.find(
      (user) =>
        user.email === email
    );

  if (!admin) {
    return null;
  }

  const validPassword =
    await bcrypt.compare(
      password,
      admin.password
    );

  if (!validPassword) {
    return null;
  }

  return admin;
}

module.exports = {
  loginAdmin
};
import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@email.com",
    phone: "+91-7002060328",
    password: bcrypt.hashSync("1234", 10),
    nationality: "india",
    isVerified: true,
    isAdmin: true,
    authorization: 1,
  },
];

export default users;

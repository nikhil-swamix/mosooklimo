import jwt from "jsonwebtoken";

const generateToken = (data, expiresIn = "30d", key) => {
  try {
    return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn });
  } catch (err) {
    throw err;
  }
};

const verifyToken = (token, key) => {
  try {
    const decoded = jwt.verify(token, key);
    return decoded;
  } catch (err) {
    throw err;
  }
};

export default { generateToken, verifyToken };

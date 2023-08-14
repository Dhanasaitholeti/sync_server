import jwt from "jsonwebtoken";

export const tokenGenerator = async (payload: any) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "5d" });
    return token;
  } catch (error) {
    console.log(error);
  }
};

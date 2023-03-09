import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../middlewares/logger";
import { getUserByEmail, getUserByUsername } from "../services";

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds: number = parseInt(process.env.SALT_ROUNDS || "", 10);

  const hashedPassword = await bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .catch((err: any) => {
      if (err instanceof Error) {
        logger.error("Error error hashed password", err.message);
      } else if (typeof err === "string") {
        logger.error("Error string hashed password", err);
      }
    });

  if (typeof hashedPassword === "string") {
    return hashedPassword;
  }

  return "";
};

const compareStringPasswordToHashedPassword = async (password: string, hashedPassword: string) : Promise<boolean> => {
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

  return isPasswordCorrect;
}

const isUsernameExist = async (username: string): Promise<boolean> => {
  const usernameExistRes = await getUserByUsername(username);

  if (usernameExistRes.success && usernameExistRes.data) {
    return !!usernameExistRes.data.userExist;
  }

  return false;
}

const isEmailExist = async (email: string): Promise<boolean> => {
  const emailExistRes = await getUserByEmail(email);

  if (emailExistRes.success && emailExistRes.data) {
    return !!emailExistRes.data.emailExist;
  }

  return false;
}

const generateJWT = async (id: string) => {
  const secret = process.env.JWT_TOKEN_SECRET || ""
  
  var token = jwt.sign({ id: id }, secret , { expiresIn: 600});

  return token;
}

export { hashPassword, compareStringPasswordToHashedPassword, isUsernameExist, isEmailExist, generateJWT };

import bcrypt from "bcrypt";
import logger from "../middlewares/logger";
import { getUserByEmail, getUserByUsername } from "../services";

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds: number = parseInt(process.env.SALT_ROUNDS || "", 10);

  const hashedPassword = await bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      return bcrypt.hash("test", salt);
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

export { hashPassword, isUsernameExist, isEmailExist };

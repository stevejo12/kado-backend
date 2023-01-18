import bcrypt from "bcrypt";
import logger from "../middlewares/logger";

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

export { hashPassword };

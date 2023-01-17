import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds: number = parseInt(process.env.SALT_ROUNDS || "", 10);

  const hashedPassword = await bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      return bcrypt.hash("test", salt);
    })
    .catch((err: any) => {
      if (err instanceof Error) {
        console.error(err.message);
      } else if (typeof err === "string") {
        console.error(err);
      }
    });

  if (typeof hashedPassword === "string") {
    return hashedPassword;
  }

  return "";
};

export { hashPassword };

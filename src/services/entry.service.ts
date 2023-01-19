import { NewUser } from "../models/entry.model";
import { ResponseMessage } from "../models/response.model";
import db from "./db.service";

const createNewUser = async (newUser: NewUser) : Promise<ResponseMessage>  => {
  try {
    const result = await db.query(
      `INSERT INTO users (username,email,password,profilePicture)
      VALUES ($1,$2,$3,$4) returning id`,
      [newUser.username, newUser.email, newUser.password, newUser.profilePicture]
    );

    return {
      success: true,
      data: {
        message: "Success Insert",
        userID: result.rows[0].id
      }
    }
  } catch (error) {
    return {
      success: false,
      data: { message: error }
    }
  }
}

export { createNewUser };
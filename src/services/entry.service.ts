import { compareStringPasswordToHashedPassword, isEmailExist, isUsernameExist } from "../helpers/user";
import logger from "../middlewares/logger";
import { NewUser } from "../models/entry.model";
import { ResponseMessage } from "../models/response.model";
import db from "./db.service";

const createNewUser = async (newUser: NewUser) : Promise<ResponseMessage>  => {
  try {
    const isUsernameNotAvailable = await isUsernameExist(newUser.username);

    if (isUsernameNotAvailable) {
      return {
        success: false,
        data: {
          message: "Username Exist",
        }
      }
    }

    const isEmailNotAvailable = await isEmailExist(newUser.email);

    if (isEmailNotAvailable) {
      return {
        success: false,
        data: {
          message: "Email Exist",
        }
      }
    }

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
    logger.error("Register new user: " + error)
    return {
      success: false,
      status: 500,
      data: { message: "Error creating new user. Try again!" }
    }
  }
}

const getUserByEmail = async (email: string): Promise<ResponseMessage> => {
  try {
    const result = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    )

    if (result && result.rowCount > 0) {
      return {
        success: true,
        data: {
          emailExist: true,
          message: "Success Search"
        }
      }
    } else {
      return {
        success: true,
        data: {
          emailExist: false,
          message: "Success Search"
        }
      }
    }
  } catch (error) {
    logger.error("Get user by email: " + error)
    return {
      success: false,
      status: 500,
      data: { 
        emailExist: true,
        message: error 
      }
    }
  }
}

const getUserByUsername = async (username: string) : Promise<ResponseMessage> => {
  try {
    const result = await db.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    )

    if (result && result.rowCount > 0) {
      return {
        success: true,
        data: {
          userExist: true,
          message: "Success Search"
        }
      }
    } else {
      return {
        success: true,
        data: {
          userExist: false,
          message: "Success Search"
        }
      }
    }
  } catch (error) {
    logger.error("Get user by username: " + error)
    return {
      success: false,
      status: 500,
      data: { 
        userExist: false,
        message: error 
      }
    }
  }
}

const getUserByEmailAndPassword = async (email: string, password: string) : Promise<ResponseMessage> => {
  try {
    const result = await db.query(
      `SELECT * FROM users WHERE email=$1`,
      [email]
    )

    if (result && result.rowCount > 0) {
      const hashedPassword = result.rows[0].password as string || null;

      if (password !== null) {
        const isPasswordCorrect = await compareStringPasswordToHashedPassword(password, hashedPassword as string);
        
        if (isPasswordCorrect) {
          return {
            success: true,
            data: {
              message: "Success Login",
              userInfo: result.rows[0],
              token: "token"
            }
          }
        } else {
          return {
            success: false,
            data: { 
              userExist: false,
              message: "Password is incorrect" 
            }
          } 
        }
      } else {
        logger.warn("User with id", result.rows[0].id, "has no password");
        return {
          success: false,
          status: 500,
          data: { 
            userExist: false,
            message: "Something's wrong!" 
          }
        } 
      }
    } else {
      return {
        success: true,
        data: {
          userExist: false,
          message: "Success Search"
        }
      }
    }
  } catch (error) {
    logger.error("Get User By Email and Password: " + error)
    return {
      success: false,
      status: 500,
      data: { 
        userExist: false,
        message: error 
      }
    }
  }
}

export { 
  createNewUser, 
  getUserByEmail, 
  getUserByUsername, 
  getUserByEmailAndPassword 
};
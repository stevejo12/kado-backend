import db from "./db.service";
import config from "../config/db.config";

const get = async (pageUsername: string, userID: number) => {
  const rows = await db.query(
    `SELECT * FROM wishlist WHERE username=?`,
    [pageUsername]
  )
}
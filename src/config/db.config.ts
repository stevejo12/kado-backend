import { Pool } from "pg";
import logger from "../middlewares/logger";

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT as string, 10)
})

pool 
  .connect()
  .then(() => logger.info("PostgreSQL is connected"))
  .catch(err => logger.error("postgreSQL connection error: " + err))


pool.on('error', err => {
  logger.error('something bad has happened!', err.stack)
});

export default pool;
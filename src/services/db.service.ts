import { PoolClient, QueryResult } from "pg";
import dbConfig from "../config/db.config";

interface returnQuery {
  response: any[];
  error: Error | null;
}

const query = async (sql: string, params: Array<any>): Promise<QueryResult> => {
  // let errMsg: Error;
  const client = await dbConfig.connect();

  const queryResult = await client.query(sql, params);

  // const response = queryResult.rows;

  // client.release();

  // return {
  //   response: response,
  //   error: null
  // }

  return queryResult;
}

export default { query };
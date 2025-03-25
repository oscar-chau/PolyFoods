import { PoolClient } from "pg";

export const gcon = (connection: PoolClient) => {
  try {
    connection.release();
  } catch {
    /* empty */
  }
};

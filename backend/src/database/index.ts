import { Pool } from "pg";
import config from "../config";

/* keeping postgres command I used cause I dont wanna write it somewhere else
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres*/
const pool = new Pool({
  database: config.POSTGRES_DB,
  user: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  port: parseInt(config.POSTGRES_PORT as string, 10),
  // max connections to database
  max: 10 // set 1 for testing, dont skip over unclosed
});

pool.on("error", (error) => {
  console.error(error.message);
});
export default pool;

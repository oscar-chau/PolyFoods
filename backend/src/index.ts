import express, { Application, Request, Response } from "express";
import logger from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import errorMiddleware from "./middleware/error.middleware";
import config from "./config";
import db from "./database/index";
import routes from "./routes/index";
import cors from "cors";

/* --- INITIALIZE --- */

const PORT = config.PORT || 3000;
export const app: Application = express();

/* --- EXPRESS ADDONS --- */

// parses incoming requests
app.use(express.json());

// in the name, logs request
// absolute godsend, never forget this nathan
app.use(logger("dev"));

// popular library for safety
app.use(helmet());

// limit requests per ip
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 20000, // Limit each IP to 20000 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again later"
  })
);

// for api calls
app.use(cors());



// custom error handler
app.use(errorMiddleware);

// --- APIs --- //

app.use("/api", routes);

// --- DATBASE TEST --- //

db.connect().then((client) => {
  return client
    .query("SELECT NOW()")
    .then((res) => {
      client.release();
      console.log(res.rows);
    })
    .catch((err) => {
      client.release();
      console.log(err.stack);
    });
});

/* --- SMALL TEST, DELETE LATER --- */

// testing get
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World"
  });
});

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting from port: ${PORT}`);
});

export default app;

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "..", ".env") });
}

// load database models
import "./models/post";
import "./models/user";

// middlewares
import { error404Middleware, errorsMiddleware } from "./middlewares";

// other imports
import { getNetworkIP } from "./lib/utils";

// environment variables
const PORT = process.env.PORT || "8000";
const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/test";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// catch 404 & other errors
app.use(error404Middleware);
app.use(errorsMiddleware);

async function main(): Promise<void> {
  try {
    app.listen(parseInt(PORT), (): void => {
      console.log(`Local address: http://127.0.0.1:${PORT}`);
      console.log(`Network address: http://${getNetworkIP()}:${PORT}`);
    });
    await mongoose.connect(DB_URI, {
      serverApi: {
        version: "1",
        deprecationErrors: true,
        strict: true,
      },
    });
  } catch (error: unknown) {
    console.error(error);
  }
}

main();

import dotenv from 'dotenv';
import express from 'express';
import { MongoClient } from "mongodb";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 1106; 
const mongo_url = process.env.URL;

if (!mongo_url) {
  console.error('Missing MongoDB URL in environment variables');
  process.exit(1);
}

export const client = new MongoClient(mongo_url);

const startServer = async () => {
  try {
    await client.connect();
    console.log("MongoDB is connected");

    app.get("/", async (req, res) => {
      try {
        const list = await client.db("oladb").collection("olaname").find({}).toArray();
        res.send(list);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
      }
    });

    app.listen(PORT, () => console.log(`The server started on port: ${PORT} ✨✨`));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

startServer();

const shutdown = async () => {
  console.log("Shutting down server...");
  await client.close();
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

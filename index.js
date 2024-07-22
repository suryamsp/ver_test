import * as dotenv from 'dotenv';

dotenv.config()

import express from 'express';
const app = express();
import { MongoClient } from "mongodb";
import cors from "cors";




app.use(express.json());
app.use(cors());

const PORT = process.env.PORT; 
const mongo_url = process.env.mongo_url;
export const client = new MongoClient(mongo_url);
console.log("mongodb is connected ");



app.get("/",async function (request, response) {
        const store= await client
        .db("oladb")
        .collection("olaname")
        .find({})
        .toArray([])
        response.send(store);
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

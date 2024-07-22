import * as dotenv from 'dotenv';

dotenv.config()

import express from 'express';
const app = express();
import { MongoClient } from "mongodb";
import cors from "cors";




app.use(express.json());


const PORT = process.env.PORT || 1106; 
const mongo_url = process.env.URL;



app.use(cors());



export const client = new MongoClient(mongo_url);
console.log("mongodb is connected ");


try {
    await client.connect();
    console.log("MongoDB is connected");
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
}





app.get("/", async function (request, response) {
  const list= await client
  .db("oladb")
  .collection("olaname")
  .find({})
  .toArray();
  response.send(list);
});



app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

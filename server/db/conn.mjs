import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("Successfully connected to PortFolioApp");
} catch(e) {
  console.error(e);
}

let db = conn.db("PortFolioApp");

export default db;
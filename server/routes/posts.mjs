import express from 'express';
import db from '../db/conn.mjs';
import mongodb from 'mongodb';

const router = express.Router();

router.get('/', async (req, res) => {
    let collection = await db.collection("posts");
    let results = await collection.find({}).toArray();
    console.log(results);
    res.send(results).status(200);
});

export default router;
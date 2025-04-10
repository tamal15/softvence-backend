const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require("mongodb").ObjectId;

const cors=require('cors');
const port =process.env.PORT || 5000;
const app=express();

app.use(express.urlencoded({ extended: true }));

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fqcn4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
    try {
        await client.connect();
        console.log("connected to database");
        const database = client.db('Overseas');
        const homeProjectCollection = database.collection('HomeProject');


        app.get("/getbannerdata", async (req, res) => {
            const result = await homeProjectCollection.find({}).toArray();
            res.json(result);
          });

          app.get("/editbaners/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const user = await bannerpostCollection.findOne(query);
            res.json(user);
          });

    }
    finally {

    }
}
run().catch(console.dir)

app.get('/', (req,res)=> {
    res.send('simple card running')
    })
    app.listen(port, () =>{ 
    console.log(`code running: ${port}`)
    })
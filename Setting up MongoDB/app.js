import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.

const uri =
  "mongodb+srv://richardjattwell:t8w3UK3FoRAhkX3F@cluster0.dks9es5.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

    //database and collection code
    const database = client.db("fruitsDB");

    const fruits = database.collection("fruits");

    // create an array of documents to insert

    const docs = [
      { name: "Apple", score: 9, review: "Easy A tier" },

      { name: "Orange", score: 10, review: "Easiest S tier of my life" },

      {
        name: "Watermelon",
        score: 7.5,
        review:
          "Pretty good. Preview the ice cream flavour to the actual fruit",
      },
    ];

    // this option prevents additional documents from being inserted if one fails

    const options = { ordered: true };

    const result = await fruits.insertMany(docs, options);

    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const { response } = require("express");
const app = express();
const port = process.env.PORT || 5000;

// user: mydbuser1
// password: rTfUSTV7E1c3D1pB

app.use(cors());
app.use(express.json());

// Connection to the Database

const uri =
  "mongodb+srv://mydbuser1:rTfUSTV7E1c3D1pB@cluster0.un4ed.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    const database = client.db("foodMaster");
    const usersCollection = database.collection("users");

    // GET API
    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.findOne(query);
      console.log("The id is:", id, result);
      res.send(result);
    });

    // UPDATE API
    // app.put("/users/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const updatedUser = req.body;
    //   console.log("Updating the id", id);
    //   res.json(updatedUser);
    // });

    // POST API
    // create a document to insert
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);

      console.log("hitting the post", newUser);
      console.log("added user", result);
      res.json(result);
    });

    // UPDATE API
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updatedUser.name,
          email: updatedUser.email,
        },
      };
      const result = await usersCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      console.log("updating the user", req.body);
      res.json(result);
    });
    //DELETE API
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      console.log("deleting item with id: ", result);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Bismillahir Rahmanir Rahim");
});
app.listen(port, () => {
  console.log("The port is: ", port);
});

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
``;
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [ 
      "http://localhost:5174",
      "https://assignment-11-d16d9.web.app",
      "assignment-11-d16d9.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pyoefad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "UnAuthorized" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }
    req.user = decoded;
    next();
  });
};

const cookieOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV= "production"? true : false ,
  sameSite: process.env.NODE_ENV === "production"?"none":"strict",
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const volunteerCollection = client
      .db("VolunteerPostDb")
      .collection("VolunteerPost");
    const requestCollection = client
      .db("VolunteerPostDb")
      .collection("RequestCollection");
    const feedBackCollection = client
      .db("VolunteerPostDb")
      .collection("feedBackCollection");

    app.get("/volunteer", async (req, res) => {
      const cursor = volunteerCollection.find().limit(6).sort({ Deadline: 1 });
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/volunteerall", async (req, res) => {
      // console.log('Cook cook Cokkies==>',req.cookies)

      // console.log("Token Owner Info -->", req.user);
      // if (req?.user?.email !== req?.query?.email) {
      //   return res.status(403).send({ message: "Forbidden Access" });
      // }
      const cursor = volunteerCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // app.get("/volunteerall", async (req, res) => {
    //   const cursor = volunteerCollection.find();
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });

    app.post("/volunteer", async (req, res) => {
      const newPost = req.body;
      const result = await volunteerCollection.insertOne(newPost);
      res.send(result);
    });

    // Updating data
    app.put("/updatevol/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateVol = req.body;
      const options = { upsert: true };
      const vol = {
        $set: {
          Thumbnail: updateVol.Thumbnail,
          Post_Title: updateVol.Post_Title,
          Category: updateVol.Category,
          Location: updateVol.Location,
          NoOfVolunteers: updateVol.NoOfVolunteers,
          Deadline: updateVol.Deadline,
          OrganizerName: updateVol.OrganizerName,
          OrganizerEmail: updateVol.OrganizerEmail,
          Description: updateVol.Description,
          Email: updateVol.Email,
          Name: updateVol.Name,
        },
      };
      const result = await volunteerCollection.updateOne(filter, vol, options);
      res.send(result);
    });

    // Deleting Data from database
    app.delete("/deletevol/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await volunteerCollection.deleteOne(query);
      res.send(result);
    });

    // Getting Personal Data for specific User
    app.get("/volunteer/:email", async (req, res) => {
      const result = await volunteerCollection
        .find({ Email: req.params.email })
        .toArray();
      res.send(result);
    });

    // My Req Post
    app.get("/myreq/:email", async (req, res) => {
      const result = await requestCollection
        .find({ Email: req.params.email })
        .toArray();
      res.send(result);
    });



    // Search Function
    app.get("/search/:title", async (req, res) => {
      const result = await volunteerCollection
        .find({ Post_Title: req.params.title })
        .toArray();
      res.send(result);
    });


    
    // Special API
    app.get("/vol/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await volunteerCollection.findOne(query);
      res.send(result);
    });

    // Request of Volunter
    app.post("/request", async (req, res) => {
      const { _id, ...newRequest } = req.body;
      const options = { $inc: { NoOfVolunteers: -1 } };
      const temp = await volunteerCollection.updateOne(
        { _id: new ObjectId(_id) },
        options
      );
      const result = await requestCollection.insertOne(newRequest);

      res.send(result);
    });

    // Cancel My req
    app.delete("/deletereq/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await requestCollection.deleteOne(query);
      res.send(result);
    });

    // Auth Related API
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1hr",
      });
      res.cookie("token", token, cookieOption).send({ success: true });
    });

    app.post("/logout", async (req, res) => {
      const user = req.body;
      res.clearCookie("token", { ...cookieOption, maxAge: 0 }).send({ seccess: true });
    });

    // FeedbackPost
    app.post('/feedback', async(req,res)=>{
      const user = req.body;
      const result  = await feedBackCollection.insertOne(user);
      res.send(result)
    })

    app.get('/feeds',async(req,res)=>{
      const cursor  = feedBackCollection.find();
      const result = await cursor.toArray()
      res.send(result)
    })





    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Assignment => 11 is running");
});
app.listen(port, () => {
  console.log(`Assignment ====> 11 is running on server ${port}`);
});

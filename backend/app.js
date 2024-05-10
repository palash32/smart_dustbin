const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const uri = "mongodb+srv://Palash:CJj698TCmeUUK25V@smartdustbin.4rxvxq2.mongodb.net/?retryWrites=true&w=majority&appName=Smartdustbin";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  await mongoose.connect(uri, clientOptions);
  await mongoose.connection.db.admin().command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
run().catch(console.dir);

app.use(cors());
app.use(bodyParser.json());

// app.use("/complaint",Complaint);

const user = require("../backend/routes/user");
app.use("/user",user);

const admin = require("../backend/routes/admin");
app.use("/admin",admin);

const mailer = require("../backend/routes/mailer");
app.use("/mailer",mailer);


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

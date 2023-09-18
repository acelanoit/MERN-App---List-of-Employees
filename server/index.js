const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const atlasUri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;
const path = require("path");

// cors is is called as a middleware in your application using the code:
app.use(cors());

// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
// This method is called as a middleware in your application using the code:
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(atlasUri);

// Mongoose schema
const recordSchema = new mongoose.Schema({
    name: String,
    position: String
});

// Mongoose model
const Record = mongoose.model("Records", recordSchema);

// Have Node serve the files for our built React app:
app.use(express.static(path.resolve(__dirname, "./client/build")));

//-------------------------------------------- Server API Endpoints --------------------------------------------

// This section will help you get a list of all the records:
app.get("/home", (req, res) => {
    Record.find(function (err, records) {
        if (err) {
            res.json(err);
        } else {

            // When the React app makes a GET request to the home route, respond with JSON data (all the records):
            res.json(records);
        }
    });
});

// This section will help you get a single record by its ID:
app.get("/edit/:id", function (req, res) {
    Record.findById(req.params.id, function (err, record) {
        if (err) {
            res.json(err);
        } else {

            // When the React app makes a GET request to the edit route, respond with JSON data (the record with the specific ID):
            res.json(record);
        }
    });
});

// This section will help you update a record by its ID:
app.patch("/edit/:id", function (req, res) {

    Record.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        position: req.body.position
    }, function (err) {
        if (!err) {

            // When the React app makes a PATCH request to the /edit/:id route, respond with a JSON object:
            res.json({ message: "Successfully updated 1 record." });
        } else {
            res.json(err);
        }
    });
});

// This section will help you create a new record:
app.post("/add", function (req, res) {
    const newRecord = new Record({
        name: req.body.name,
        position: req.body.position
    });
    newRecord.save(function (err) {
        if (!err) {

            // When the React app makes a POST request to the /add route, respond with a JSON object:
            res.json({ message: "Successfully added a new record." });
        } else {
            res.json(err);
        }
    });
});

// This section will help you delete a record based on its ID:
app.delete("/delete/:id", function (req, res) {

    Record.findByIdAndRemove(req.params.id, function (err) {
        if (!err) {

            // When the React app makes a DELETE request to the /delete/:id route, respond with a JSON object:
            res.json({ message: "Successfully deleted 1 record." });
        } else {
            res.json(err);
        }
    });

});

//--------------------------------------------------------------------------------------------------------------

// All other GET requests not handled before will return our React app:
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });

app.listen(port, () => console.log("Server is running on port " + port));
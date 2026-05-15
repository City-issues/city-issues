const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://20256544_db_user:IjxkYzZBOuiN6GcV@testing.l2fgajl.mongodb.net/cityissue?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(console.error);

// Schema
const reportSchema = new mongoose.Schema({
  issueType: String,
  location: String,
  description: String,
  status: String,
});

// link to "reports" collection
const Issue = mongoose.model("Issue", reportSchema, "reports");

// CREATE
app.post("/issues", async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (error) {
    res.status(500).json({ message: "Error saving issue" });
  }
});

// GET ALL
app.get("/issues", async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: "Error fetching issues" });
  }
});

// Gets data on mongodb by id
app.get("/issues/:id", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: "Error fetching issue" });
  }
});

 // UPDATE issue
app.put("/issues/:id", async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { ...req.body, status: "resolved" }, //  change status
      { new: true }
    );
    res.json(updatedIssue);
  } catch (error) {
    res.status(500).json({ message: "Error updating issue" });
  }
});

// DELETE issue
app.delete("/issues/:id", async (req, res) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);
    res.json({ message: "Issue deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting issue" });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
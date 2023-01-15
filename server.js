const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.connect("mongodb://localhost:27017/travelLogDb");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const travelLogSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: String },
  location: { type: Array },
  rating: { type: Number },
  experience: { type: String },
});

const TravelLog = mongoose.model("TravelLog", travelLogSchema);

app.get("/all-logs", async(req, res)=>{
  const 
});

app.post("/add-log", async (req, res) => {
  const title = req.body.logTitle;
  const location = req.body.logLocation;
  const rating = req.body.logRating;
  const experience = req.body.logExperience;
  const author = req.body.logAuthor;

  try {
    const travelLog = new TravelLog({
      title,
      location,
      rating,
      experience,
      author,
    });
    const createdLog = await travelLog.save();
    res.status(201).json({
      status: "Success",
      data: {
        createdLog,
      },
    });
  } catch (error) {
    res.status(201).json({
      status: "Success",
      data: {
        createdTweet,
      },
    });
  }
});
app.listen(50
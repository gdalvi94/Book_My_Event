const mongoose = require("mongoose"); //importing mongoose

//defining schema for event
const EventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    eventType: String,
    date: Date,
    time: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Event", EventSchema); //exporting the model

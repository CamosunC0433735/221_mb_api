import messageSchema from "../models/message-schema.js";

import mongoose from "mongoose";
const messageModel = mongoose.model("message");

// let messages = [
//     { id: 0, name: "David", msgText: "Hello world" },
//     { id: 1, name: "Paul", msgText: "Hi David" },
//     { id: 2, name: "George", msgText: "I love writing messages to my imaginary friends" }
// ]

// GET Request Handler
const getAllMessages = async (req, res) => {
  try {
    console.log("trying");
    let messages = await messageModel
      .find({}, "", { sort: { _id: -1 } })
      .exec();
    res.status(200).json(messages);
  } catch (err) {
    console.log("failed");
    res.status(400).send("Bad Request");
  }
};
// POST Request Handler
const addNewMessage = async (req, res) => {
  try {
    //let message = await messageSchema.validate(req.body);
    // message.id = messages.length;
    // messages.unshift(message);
    let message = await messageModel.create(req.body);
    res.status(201).send(message);
    // console.log(messages);
  } catch (err) {
    console.log(req.body);
    res.status(400).send(
      "Bad Request. The message in the body of the \
        Request is either missing or malformed."
    );
  }
};

const updateMessage = async (req, res) => {
  try {
    let message = await messageModel.findById(req.params.messageId).exec();
    if (!message) {
      // there wasn't an error, but the message wasn't found
      // i.e. the id given doesn't match any in the database
      res.sendStatus(404);
    } else {
      // message found - is the user authorized?
      if (message.name === req.user.username) {
        // auth user is owner of message, proceed w/ update
        message.msgText = req.body.msgText;
        await message.save();
        // send back 204 No Content
        res.sendStatus(204);
      } else {
        // auth user is not owner, unauthorized
        res.sendStatus(401);
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export { getAllMessages, addNewMessage, updateMessage };

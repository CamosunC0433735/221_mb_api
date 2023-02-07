import messageSchema from '../models/message-schema.js';

import mongoose from 'mongoose';
const messageModel = mongoose.model('message');

// let messages = [
//     { id: 0, name: "David", messageTxt: "Hello world" },
//     { id: 1, name: "Paul", messageTxt: "Hi David" },
//     { id: 2, name: "George", messageTxt: "I love writing messages to my imaginary friends" }
// ]

// GET Request Handler
const getAllMessages = async (req, res) => {
    try {
        console.log("trying");
        let messages = await messageModel.find( {}, '', { sort: { _id: -1 } } 
        ).exec();
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

    } catch (err){
        console.log(req.body);
        res.status(400).send("Bad Request. The message in the body of the \
        Request is either missing or malformed.");
    }
};

export { getAllMessages, addNewMessage };
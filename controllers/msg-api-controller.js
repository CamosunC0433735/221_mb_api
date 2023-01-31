import messageSchema from '../models/message-schema.js';

let messages = [
    { id: 0, name: "David", messageTxt: "Hello world" },
    { id: 1, name: "Paul", messageTxt: "Hi David" },
    { id: 2, name: "George", messageTxt: "I love writing messages to my imaginary friends" }
]

// GET Request Handler
const getAllMessages = (req, res) => {
    try {
    res.status(200).json(messages);
    } catch (err) {
        res.status(400).send("Bad Request");
    }
    
};
// POST Request Handler
const addNewMessage = async (req, res) => {
    try {
        let message = await messageSchema.validate(req.body);
        message.id = messages.length;
        messages.unshift(message);
        res.status(201).send(message);
        console.log(messages);

    } catch (err){
        console.log(req.body);
        res.status(400).send("Bad Request. The message in the body of the \
        Request is either missing or malformed.");
    }
};

export { getAllMessages, addNewMessage };
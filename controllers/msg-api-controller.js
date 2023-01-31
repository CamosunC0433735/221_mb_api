// GET Request Handler
const getAllMessages = (req, res) => {
    res.status(200).send('Successful API GET Request');
    
};
// POST Request Handler
const addNewMessage = async (req, res) => {
    res.status(200).send('Successful API POST Request');
};

let messages = [
    { id: 0, name: "David", messageTxt: "Hello world" },
    { id: 1, name: "Paul", messageTxt: "Hi David" },
    { id: 2, name: "George", messageTxt: "I love writing messages to my imaginary friends" }
]

export { getAllMessages, addNewMessage };
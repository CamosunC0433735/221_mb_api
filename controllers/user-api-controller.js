import mongoose from 'mongoose';
const userModel = mongoose.model('user')

const registerNewUser = async (req, res) => {
    //res.status(200).send('Successful API New User POST Request');

    try {
        if (await alreadyExists(req.body.email, req.body.username)){
            res.status(403).send("Username or email already exists.")
        }
        else{
            let user = await userModel.create(req.body);
            res.status(201).send(user);
        }
    } catch (err){
        console.log(req.body);
        res.status(400).send("Bad Request. The message in the body of the \
        Request is either missing or malformed.");
    }

}

// helper function to determine if email or username
// already exists in the DB. Returns true or false.
const alreadyExists = async (email, username) => (
    await userModel.exists({
        '$or': [
            { email: email },
            { username: username }
        ]
    })
);

export { registerNewUser };
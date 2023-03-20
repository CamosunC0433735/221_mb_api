import mongoose from 'mongoose';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';

const userModel = mongoose.model('user')

const registerNewUser = async (req, res) => {
    //res.status(200).send('Successful API New User POST Request');

    try {
        if (await alreadyExists(req.body.email, req.body.username)) {
            res.status(403).send("Username or email already exists.")
        }
        else {
            let user = await userModel.create(req.body);
            res.status(201).send(user);
        }
    } catch (err) {
        console.log(req.body);
        res.status(400).send("Bad Request. The message in the body of the \
        Request is either missing or malformed.");
    }
}

const logInUser = (req, res) => {
    res.status(200).send("Successful API Login Request");
};

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


passport.use(new BasicStrategy(
    (username, password, done) => {
        userModel
            .findOne({
                '$or': [
                    { email: username },
                    { username: username }
                ]
            })
            .exec(async (error, user) => {
                if (error) return done(error);
                // user wasn't found
                if (!user) return done(null, false);
                // user was found, see if it's a valid password
                if (!await user.verifyPassword(password)) {
                    return done(null,
                        false);
                }
                return done(null, user);
            });
    }
));


export { registerNewUser, logInUser };
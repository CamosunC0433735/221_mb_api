import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';

import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;


const userModel = mongoose.model('user')
const usernameUpdateModel = mongoose.model('usernameUpdate')
const emailUpdateModel = mongoose.model('emailUpdate')

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
    // generates a JWT Token
    jwt.sign(
        {
            sub: req.user._id,
            username: req.user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: '20m' },
        (error, token) => {
            if (error) {
                res.status(400).send('Bad Request. Couldn\'t generate token.');
            } else {
                res.status(200).json({ token });
            }
        }
    );
};

const changeUsername = async (req, res) => {
    try {
      let username = await usernameUpdateModel.findById(req.params.userId).exec();
      if (!username) {
        // there wasn't an error, but the username wasn't found
        // i.e. the id given doesn't match any in the database
        res.sendStatus(404);
      } else {
        //console.log(username);
        // username found - is the user authorized?
        if (username.username === req.user.username) {
          // auth user is owner of username, change it!
            username.username = req.body.username;
            await username.save();
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
  
  const changeEmail = async (req, res) => {
    try {
      let email = await emailUpdateModel.findById(req.params.userId).exec();
      if (!email) {
        // there wasn't an error, but the username wasn't found
        // i.e. the id given doesn't match any in the database
        res.sendStatus(404);
      } else {
        // username found - is the user authorized?
        if (email.email === req.user.email) {
          // auth user is owner of username, change it!
            email.email = req.body.email;
            await email.save();
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

// Configure JWT Token Auth
passport.use(new JwtStrategy(
    jwtOptions, (jwt_payload, done) => {
        userModel
            .findById(jwt_payload.sub)
            .exec((error, user) => {
                // error in searching
                if (error) return done(error);
                if (!user) {
                    // user not found
                    return done(null, false);
                } else {
                    // user found
                    return done(null, user);
                }
            })
    }
));


passport.use(new LocalStrategy(
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
))

export { registerNewUser, logInUser, changeUsername, changeEmail };
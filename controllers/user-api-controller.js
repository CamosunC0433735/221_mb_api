import mongoose from 'mongoose';
const userModel = mongoose.model('user')

const registerNewUser = async (req, res) => {
    res.status(200).send('Successful API New User POST Request');
    }

export {registerNewUser};
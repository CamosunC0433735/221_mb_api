import express from 'express';

import { getAllMessages, addNewMessage } from '../controllers/msg-api-controller.js';
import { registerNewUser, logInUser } from '../controllers/user-api-controller.js';

import passport from 'passport';

const router = express.Router();

router.route('/messages').get(getAllMessages).post(passport.authenticate('jwt', { session: false }), addNewMessage);
router.route('/users').post(registerNewUser);
router.route('/login').post(passport.authenticate('local', { session: false }), logInUser);

export default router;
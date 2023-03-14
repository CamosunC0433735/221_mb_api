import express from 'express';

import { getAllMessages, addNewMessage } from '../controllers/msg-api-controller.js';
import { registerNewUser } from '../controllers/user-api-controller.js';
import passport from 'passport';

const router = express.Router();

router.route('/messages').get(getAllMessages).post(passport.authenticate('basic', { session: false }), addNewMessage);
router.route('/users').post(registerNewUser);

export default router;
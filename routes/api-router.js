import express from 'express';

import { getAllMessages, addNewMessage } from '../controllers/msg-api-controller.js';
import {registerNewUser} from '../controllers/user-api-controller.js';

const router = express.Router();

router.route('/messages').get(getAllMessages).post(addNewMessage);
router.route('/users').post(registerNewUser);

export default router;
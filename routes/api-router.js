import express from 'express';
import { getAllMessages, addNewMessage } from '../controllers/msg-api-controller.js';
const router = express.Router();

router.route('/messages').get(getAllMessages).post(addNewMessage);

export default router;
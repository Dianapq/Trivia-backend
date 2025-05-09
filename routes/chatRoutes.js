import express from 'express';
import { generateChatResponse, getConversationHistory, generateTrivia } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', generateChatResponse);
router.get('/history', getConversationHistory);

// Nueva ruta para trivia
router.post('/trivia', generateTrivia);

export { router };

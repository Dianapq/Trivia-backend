import express from 'express';
import GameSession from '../models/GameSession.js';

const router = express.Router();

router.post('/save', async (req, res) => {
  try {
    const session = new GameSession(req.body);
    await session.save();
    res.status(201).json({ message: 'Sesión guardada correctamente' });
  } catch (err) {
    console.error('Error guardando la sesión:', err);
    res.status(500).json({ error: 'Error al guardar la sesión' });
  }
});

export default router;

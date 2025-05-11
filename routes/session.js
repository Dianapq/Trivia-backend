import express from 'express';
import GameSession from '../models/GameSession.js';

const router = express.Router();

router.post('/save', async (req, res) => {
  console.log("📥 Datos recibidos en /save:", req.body);
  try {
    const session = new GameSession(req.body);
    await session.save();
    res.status(201).json({ message: 'Sesión guardada correctamente' });
  } catch (err) {
    console.error("❌ Error guardando sesión:", err);
    res.status(500).json({ error: err.message });
  }
});


export default router;

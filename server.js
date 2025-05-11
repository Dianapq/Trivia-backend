import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import sessionRoutes from './routes/session.js';
import { router as chatRoutes } from './routes/chatRoutes.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config();

// Verificación clave
console.log("🌍 URI Mongo recibida:", process.env.MONGO_URI);

// Inicializar app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chat-gpt-app';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB conectado desde Vercel'))
  .catch(err => console.error('❌ Error de conexión a MongoDB desde Vercel:', err.message));

// Verificar configuración de OpenAI (opcional)
if (!process.env.OPENAI_API_KEY) {
  console.warn('⚠️  No se encontró la variable OPENAI_API_KEY');
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) {
    console.error('❌ No se encontró el archivo .env');
  }
}

// Rutas
app.use('/api/session', sessionRoutes);
app.use('/api/chat', chatRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.json({
    message: 'API funcionando correctamente',
    mongo: !!process.env.MONGO_URI,
    status: 'conectado'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

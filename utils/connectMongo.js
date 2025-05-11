import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('❌ No se ha definido la URI de MongoDB');
  }

  try {
    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = db.connections[0].readyState;
    console.log('✅ Conexión forzada a MongoDB establecida');
  } catch (err) {
    console.error('❌ Falló conexión forzada a MongoDB:', err.message);
    throw err;
  }
}

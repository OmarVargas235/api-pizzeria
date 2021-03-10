// =====================================
// PUERTO
// =====================================
process.env.PORT = process.env.PORT || 5000;

// ====================================
// SEED de autenticacion
// ====================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// =====================================
// Base de Datos
// =====================================
process.env.DATABASE = process.env.DATABASE || 'mongodb://localhost:27017/pizzeriaAPI';
// 'mongodb+srv://pizza-api:omar142536@cluster0.xi5k6.mongodb.net/pizzeriaAPI';

// =====================================
// Puerto del Frontend
// =====================================
process.env.FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
# 🍕 API Pizzería

## 📌 Descripción

Backend REST API para una aplicación de gestión de pizzerías.

La API permite la gestión de usuarios, autenticación, perfiles y sucursales, incluyendo manejo de
imágenes y validación de datos.

El proyecto está construido con **Node.js**, **TypeScript**, **Express** y **Prisma ORM**, siguiendo
una arquitectura basada en features donde cada módulo mantiene separadas sus responsabilidades.

---

## 🚀 Tecnologías

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Zod
- Cloudinary
- Multer
- Jest
- Supertest
- Husky
- ESLint
- Prettier

---

## 📋 Requisitos

Antes de ejecutar el proyecto necesitas:

- Node.js >= 20
- PostgreSQL >= 15
- npm >= 10

---

## ⚙️ Instalación

### Clonar el repositorio

```bash
git clone <repository-url>

cd api-pizzeria-app
```

### Instalar dependencias

```bash
npm install
```

---

## 🔐 Variables de entorno

Crear los siguientes archivos:

```text
.env
.env.test
```

Puedes utilizar como referencia:

```text
.env.example
```

### Ejemplo

```env
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
DATABASE_URL=

PORT=3000

JWT_SECRET=

EMAIL_USER=
EMAIL_PASSWORD=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

FRONTEND_URL=

NODE_ENV=development
```

---

## 🗄️ Base de datos

### Generar cliente Prisma

```bash
npm run prisma:generate
```

### Ejecutar migraciones

```bash
npm run prisma:migrate
```

### Abrir Prisma Studio

```bash
npm run prisma:studio
```

---

## 🌱 Seed

El proyecto utiliza Prisma Seed.

### Ejecutar seed

```bash
npx prisma db seed
```

Configuración:

```json
{
    "prisma": {
        "seed": "tsx prisma/seed.ts"
    }
}
```

---

## ▶️ Ejecutar proyecto

### Modo desarrollo

```bash
npm run dev
```

### Compilar proyecto

```bash
npm run build
```

### Ejecutar versión compilada

```bash
npm start
```

---

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### Coverage

Generar reporte de cobertura:

```bash
npm run coverage
```

### Integration Tests

```bash
npm run test:integration
```

Las pruebas utilizan una base de datos independiente configurada mediante:

```text
.env.test
```

### Casos cubiertos

- Autenticación JWT
- Registro y login
- Refresh tokens
- Logout
- Perfil de usuario
- Actualización de avatar
- Upload de archivos
- Sucursales
- Manejo de errores

---

## 🧪 Base de datos de testing

Preparar la base de datos de pruebas:

```bash
npm run db:test:setup
```

Este comando ejecuta:

- Migraciones de testing (`prisma migrate deploy`)
- Seed de testing (`prisma db seed`)

Utilizando las variables definidas en:

```text
.env.test
```

---

## 🏗️ Arquitectura

El proyecto utiliza una arquitectura organizada por features.

### Estructura general

```text
src
├── config
├── database
├── shared
│
├── features
│   ├── auth
│   ├── profile
│   └── store
│
├── app.ts
└── index.ts
```

### Estructura de una feature

```text
feature
├── controller
├── dto
├── repository
├── routes
├── service
└── types
```

---

## 🔄 Flujo de una petición

```text
Request
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Prisma
   ↓
PostgreSQL
```

---

## 🔐 Autenticación

La API utiliza autenticación mediante JWT.

Las rutas protegidas requieren:

```http
Authorization: Bearer <access_token>
```

### Funcionalidades

- Registro de usuario
- Login
- Refresh Token
- Logout
- Recuperación de contraseña

---

## 👤 Perfil

### Funcionalidades

- Obtener perfil autenticado
- Actualizar información personal
- Actualizar avatar

Las imágenes se almacenan mediante Cloudinary.

---

## 🏪 Stores

### Funcionalidades

- Obtener listado de sucursales
- Obtener sucursal por ID

### Incluye

- Validación de autenticación
- Manejo de errores
- Validación de recursos inexistentes

---

## 🛡️ Validaciones y seguridad

El proyecto incluye:

- Validación de datos mediante Zod
- Manejo centralizado de errores
- JWT Authentication
- Rate Limiting
- Helmet Security Headers
- Validación de archivos
- Límite de tamaño de uploads
- Validación de tipos MIME

---

## 📂 Scripts disponibles

| Script                     | Descripción                    |
| -------------------------- | ------------------------------ |
| `npm run dev`              | Ejecutar entorno de desarrollo |
| `npm run build`            | Compilar el proyecto           |
| `npm start`                | Ejecutar versión compilada     |
| `npm run lint`             | Ejecutar ESLint                |
| `npm run lint:fix`         | Corregir errores de lint       |
| `npm run format`           | Formatear código con Prettier  |
| `npm run prisma:generate`  | Generar cliente Prisma         |
| `npm run prisma:migrate`   | Ejecutar migraciones           |
| `npm run prisma:studio`    | Abrir Prisma Studio            |
| `npm run test`             | Ejecutar unit tests            |
| `npm run test:integration` | Ejecutar integration tests     |
| `npm run coverage`         | Generar reporte de cobertura   |

---

## 📌 Próximas mejoras

- Documentación OpenAPI / Swagger
- Validación avanzada de query params
- Dockerización
- Pipeline CI/CD

---

## 👨‍💻 Autor

**Omar Vargas**

GitHub:

https://github.com/OmarVargas235

# Backend para Alumnos.js

Este es un backend sencillo para persistir los datos del leaderboard de la aplicación Alumnos.js.

## Requisitos

- Node.js
- MongoDB (instalado y ejecutándose localmente)

## Configuración

1. Instala las dependencias:
   ```
   npm install
   ```

2. Asegúrate de que MongoDB esté ejecutándose en `localhost:27017`

3. Inicializa la base de datos con datos de prueba:
   ```
   node seed.js
   ```

## Ejecución

Para iniciar el servidor en modo desarrollo:
```
npm run dev
```

El servidor se ejecutará en http://localhost:5000

## API Endpoints

- `GET /api/userProgress` - Obtener todos los usuarios para el leaderboard
- `GET /api/userProgress/:userId` - Obtener progreso de un usuario específico
- `POST /api/userProgress` - Crear o actualizar progreso de usuario
- `POST /api/userProgress/:userId/question` - Actualizar progreso de una pregunta 
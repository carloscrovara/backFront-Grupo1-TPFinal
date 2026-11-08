# Proyecto Final - Desarrollo de Sistemas Web (BackEnd) / Desarrollo de Sistemas Web (FrontEnd)

**Integrantes del grupo:**
- Contreras, Axel
- Crovara, Carlos
- D'Arena, Débora
- Dillon, Facundo 
- Mac Donald, Maximiliano

**Materias:** Desarrollo de Sistemas Web (BackEnd) / Desarrollo de Sistemas Web (FrontEnd)

**Profesores:** Zammataro, Gustavo y Balbuena, Federico

**Año de cursada:** 2026

**Carrera:** Tecnicatura Superior en Desarrollo de Software

**Institución:** Instituto de Formación Técnica Superior (IFTS) Nº 11

---
## Descripción del proyecto

**Recetario** es una aplicación web para gestionar recetas de cocina. Permite cargar, consultar, editar y eliminar recetas, ingredientes, categorías, autores y menús, para tener un recetario organizado en un solo lugar. Desarrollada con **Angular**, **Node.js/Express** y **MongoDB**.

---
## Clonar el repositorio
Clonar el repositorio vía SSH (recomendable) o HTTPS. Este paso es común para el backend y el frontend.

---
# Backend

## Instrucciones para levantar el backend
1. En carpeta `backend`, instalar las dependencias del proyecto con este comando:
```bash
cd backend
npm install
```

2. Antes de iniciar el servidor, es necesario configurar las variables de entorno. Para esto, crear un archivo `.env` en la carpeta `backend` con el siguiente contenido (dejar comentada la variable local si se desea usar la base de datos de Atlas):

```env
# Local
# MONGODB_URI=uri_conexion_local

# Atlas
USER_DB_MONGO=usuario_mongo
PASSWORD_DB_MONGO=pass_mongo
APP_NAME_MONGO=app_name_mongo
```

3. Para correr el servidor de Node con Express, ejecutar el siguiente comando dentro de la carpeta `backend`:

```bash
cd backend
npm start
```

4. El servidor queda escuchando en `http://127.0.0.1:3000`. Para verificar que funciona, probar `GET http://127.0.0.1:3000/api/health`.

5. (Opcional) Cargar el set de datos de prueba (autores, categorías, ingredientes, recetas y menús). **Atención:** esto borra el contenido actual de esas colecciones en la base `recetario`.

```bash
cd backend
npm run seed
```

## Estructura

```
backend/
├── database/
│   ├── config.js            ← parámetros de conexión
│   ├── conexion.js          ← conecta a MongoDB; la llama cada Repository
│   └── seed.js              ← set de datos de prueba
├── Routers/                 ← maneja enrutamiento de las solicitudes
├── Controllers/             ← expone la funcionalidad a clientes externos
├── Services/                ← lógica de negocio
├── Repositories/            ← único acceso a la BD
│   └── model/               ← schemas de Mongoose
├── index.js                 ← crea el servidor, monta los routers y arranca
├── package.json             ← dependencias y scripts
├── .gitignore               ← archivos excluidos del repositorio
├── peticiones_test.http     ← pruebas de todos los endpoints (REST Client)
└── .env                     ← variables de entorno
```

## Endpoints disponibles

URL base: `http://127.0.0.1:3000/api`

| Recurso | Ruta | Métodos |
|---|---|---|
| Health check | `/health` | `GET` |
| Recetas | `/recetas` | `GET`, `POST` |
| Recetas | `/recetas/:id` | `GET`, `PATCH`, `DELETE` |
| Ingredientes | `/ingredientes` | `GET`, `POST` |
| Ingredientes | `/ingredientes/:id` | `GET`, `PATCH`, `DELETE` |
| Categorías | `/categorias` | `GET`, `POST` |
| Categorías | `/categorias/:id` | `GET`, `PATCH`, `DELETE` |
| Autores | `/autores` | `GET`, `POST` |
| Autores | `/autores/:id` | `GET`, `PATCH`, `DELETE` |
| Menús | `/menus` | `GET`, `POST` |
| Menús | `/menus/:id` | `GET`, `PATCH`, `DELETE` |

En el archivo `backend/peticiones_test.http` hay ejemplos de cada petición (se pueden ejecutar con la extensión **REST Client** de **VS Code**).

---
# Frontend

_Documentación del frontend pendiente._

## Instrucciones para levantar el frontend

Para levantar el frontend (Angular), en otra terminal ejecutar lo siguiente. Se abre en `http://localhost:4200`, que es el único origen permitido por CORS en el backend:

```bash
cd frontend
npm install
ng serve
```

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

4. El servidor queda escuchando en `http://127.0.0.1:3000`. Para verificar que funciona, probar `GET http://127.0.0.1:3000/api/health`. Por CORS, solo acepta peticiones desde el frontend en `http://localhost:4200`.

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

## Instrucciones para levantar el frontend

1. Tener el backend levantado (ver sección **Backend**), ya que el frontend lo necesita para obtener y guardar los datos.

2. En **otra terminal**, instalar las dependencias y correr el servidor de desarrollo de Angular. Se abre en `http://localhost:4200`, que es el único origen permitido por CORS en el backend:

```bash
cd frontend
npm install
ng serve
```

3. La URL de la API se configura en `frontend/src/environments/environment.ts` (y `environment.development.ts`). Por defecto apunta a `http://127.0.0.1:3000/api`.

## Tecnologías

- **Angular 22**: componentes standalone, rutas con carga diferida (*lazy loading*) y señales (*signals*).
- **Bootstrap 5**: estilos y diseño responsive.
- **RxJS**: manejo de las peticiones HTTP asíncronas.
- **TypeScript**.

## Estructura

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/      ← listado, detalle y formulario de cada recurso, navbar y buscador
│   │   ├── models/          ← interfaces de los datos
│   │   ├── services/        ← comunicación con la API (ApiService y un servicio por recurso)
│   │   ├── pipes/           ← pipe `dificultad` para mostrar nivel de dificultad de las recetas
│   │   ├── app.routes.ts    ← definición de rutas
│   │   └── app.config.ts    ← configuración de la aplicación (router y HttpClient)
│   ├── environments/        ← URL de la API según el entorno
│   ├── index.html           ← página principal
│   ├── main.ts              ← arranca la aplicación Angular
│   └── styles.css           ← estilos globales
├── angular.json             ← configuración del proyecto Angular
├── package.json             ← dependencias y scripts
└── tsconfig*.json           ← configuración de TypeScript
```

## Rutas disponibles

URL base: `http://localhost:4200`

| Recurso | Ruta | Pantalla | Llamadas a la API |
|---|---|---|---|
| Recetas | `/recetas` | Listado | `GET /recetas`, `DELETE /recetas/:id` |
| Recetas | `/recetas/nueva` | Formulario de alta | `POST /recetas`, `GET /ingredientes`, `GET /autores`, `GET /categorias` |
| Recetas | `/recetas/:id` | Detalle | `GET /recetas/:id`, `DELETE /recetas/:id` |
| Recetas | `/recetas/:id/editar` | Formulario de edición | `GET /recetas/:id`, `PATCH /recetas/:id`, `GET /ingredientes`, `GET /autores`, `GET /categorias` |
| Categorías | `/categorias` | Listado | `GET /categorias`, `DELETE /categorias/:id` |
| Categorías | `/categorias/nueva` | Formulario de alta | `POST /categorias` |
| Categorías | `/categorias/:id` | Detalle | `GET /categorias/:id`, `DELETE /categorias/:id` |
| Categorías | `/categorias/:id/editar` | Formulario de edición | `GET /categorias/:id`, `PATCH /categorias/:id` |
| Ingredientes | `/ingredientes` | Listado | `GET /ingredientes`, `DELETE /ingredientes/:id` |
| Ingredientes | `/ingredientes/nuevo` | Formulario de alta | `POST /ingredientes` |
| Ingredientes | `/ingredientes/:id` | Detalle | `GET /ingredientes/:id`, `DELETE /ingredientes/:id` |
| Ingredientes | `/ingredientes/:id/editar` | Formulario de edición | `GET /ingredientes/:id`, `PATCH /ingredientes/:id` |
| Menús | `/menus` | Listado | `GET /menus`, `DELETE /menus/:id` |
| Menús | `/menus/nuevo` | Formulario de alta | `POST /menus`, `GET /recetas` |
| Menús | `/menus/:id` | Detalle | `GET /menus/:id`, `DELETE /menus/:id` |
| Menús | `/menus/:id/editar` | Formulario de edición | `GET /menus/:id`, `PATCH /menus/:id`, `GET /recetas` |
| Autores | `/autores` | Listado | `GET /autores`, `DELETE /autores/:id` |
| Autores | `/autores/nuevo` | Formulario de alta | `POST /autores` |
| Autores | `/autores/:id` | Detalle | `GET /autores/:id`, `DELETE /autores/:id` |
| Autores | `/autores/:id/editar` | Formulario de edición | `GET /autores/:id`, `PATCH /autores/:id` |

La ruta raíz `/` y cualquier ruta inexistente redirigen a `/recetas`.

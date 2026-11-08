# Proyecto Final - Desarrollo de Sistemas Web (BackEnd) / Desarrollo de Sistemas Web (FrontEnd)

**Integrantes del grupo:**
- Contreras, Axel 
- Crovara, Carlos 
- D'Arena, Débora
- Dillon, Facundo 
- Mac Donald, Maximiliano 

**Materia:** Desarrollo de Sistemas Web (BackEnd)

**Profesor:** Zammataro, Gustavo

**Año de cursada:** 2026

**Carrera:** Tecnicatura Superior en Desarrollo de Software

**Institución:** Instituto de Formación Técnica Superior (IFTS) Nº 11

---
## Descripción del proyecto

**Recetario** es una aplicación web para gestionar recetas de cocina. Permite cargar, consultar, editar y eliminar recetas, ingredientes, categorías, autores y menús, para tener un recetario organizado en un solo lugar. Desarrollada con **Angular**, **Node.js/Express** y **MongoDB**.

---
## Instrucciones para usar el repositorio
1. Clonar el repositorio vía SSH (recomendable) o HTTPS.

2. En carpeta `backend`, instalar las dependencias del proyecto con este comando:
```bash
cd backend
npm install
```

3. Antes de iniciar el servidor, es necesario configurar las variables de entorno. Para esto, crear un archivo `.env` en la carpeta `backend` con el siguiente contenido (dejar comentada la variable local si se desea usar la base de datos de Atlas):

```env
# Local
# MONGODB_URI=uri_conexion_local

# Atlas
USER_DB_MONGO=usuario_mongo
PASSWORD_DB_MONGO=pass_mongo
APP_NAME_MONGO=app_name_mongo
```

4. Para correr el servidor de Node con Express, ejecutar el siguiente comando dentro de la carpeta `backend`:

```bash
cd backend
npm start
```

5. El servidor queda escuchando en `http://127.0.0.1:3000`. Para verificar que funciona, probar `GET http://127.0.0.1:3000/api/health`.

6. (Opcional) Cargar el set de datos de prueba (autores, categorías, ingredientes, recetas y menús). **Atención:** esto borra el contenido actual de esas colecciones en la base `recetario`.

```bash
cd backend
npm run seed
```

---
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

En el archivo `peticiones_test.http` hay ejemplos de cada petición (se pueden ejecutar con la extensión **REST Client** de **VS Code**).

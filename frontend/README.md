# Proyecto Final - Desarrollo de Sistemas Web (BackEnd) / Desarrollo de Sistemas Web (FrontEnd)

**Integrantes del grupo:**
- Contreras, Axel
- Crovara, Carlos
- D'Arena, Débora
- Dillon, Facundo
- Mac Donald, Maximiliano

**Materia:** Desarrollo de Sistemas Web (FrontEnd)

**Profesor:** Balbuena, Federico

**Año de cursada:** 2026

**Carrera:** Tecnicatura Superior en Desarrollo de Software

**Institución:** Instituto de Formación Técnica Superior (IFTS) Nº 11

---
## Descripción del proyecto

**Recetario** es una aplicación web para gestionar recetas de cocina. Permite cargar, consultar, editar y eliminar recetas, ingredientes, categorías, autores y menús, para tener un recetario organizado en un solo lugar. Desarrollada con **Angular**, **Node.js/Express** y **MongoDB**. Este directorio contiene el **frontend** (Angular), que consume la API REST del backend.

---
## Instrucciones para usar el repositorio
1. Clonar el repositorio vía SSH (recomendable) o HTTPS.

2. En carpeta `frontend`, instalar las dependencias del proyecto con este comando:
```bash
cd frontend
npm install
```

3. Verificar la URL de la API en `src/environments/environment.ts` (y `environment.development.ts`). Por defecto apunta al backend local:

```ts
export const environment = {
    production: false,
    apiUrl: 'http://127.0.0.1:3000/api'
};
```

4. En **otra terminal**, levantar el backend (ver el README de la carpeta `backend`), ya que el frontend lo necesita para obtener y guardar los datos:

```bash
cd backend
npm start
```

5. Para correr el servidor de desarrollo de Angular, ejecutar el siguiente comando dentro de la carpeta `frontend`:

```bash
cd frontend
ng serve
```

6. La aplicación queda disponible en `http://localhost:4200`, que es el único origen permitido por CORS en el backend.

---
## Tecnologías

- **Angular 22**: componentes standalone, rutas con carga diferida (*lazy loading*) y *signals*.
- **Bootstrap 5**: estilos y diseño responsive.
- **RxJS (Observables)**: manejo de las respuestas asíncronas de la API REST, a las que los componentes se suscriben para recibir los datos.
- **Pipes**: transforman un dato al mostrarlo en la plantilla, sin modificar el dato original. Se usan los de Angular (`uppercase` y `titlecase`) y uno propio (`dificultad`).
- **TypeScript**.

---
## Estructura

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/      ← listado, detalle y formulario de cada recurso, navbar y buscador
│   │   ├── models/          ← interfaces de los datos
│   │   ├── services/        ← comunicación con la API (ApiService y un servicio por recurso)
│   │   ├── pipes/           ← pipe `dificultad` para mostrar con acentos el nivel de dificultad
│   │   ├── app.routes.ts    ← definición de rutas
│   │   └── app.config.ts    ← configuración de la aplicación (router y HttpClient)
│   ├── environments/        ← URL de la API según el entorno
│   ├── index.html           ← página principal
│   ├── main.ts              ← arranca la aplicación Angular
│   └── styles.css           ← estilos globales
├── angular.json             ← configuración del proyecto Angular
├── package.json             ← dependencias y scripts
├── .gitignore               ← archivos excluidos del repositorio
└── tsconfig*.json           ← configuración de TypeScript
```

---
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

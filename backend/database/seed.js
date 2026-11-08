// Set de datos de prueba para la base "recetario".
// Uso: npm run seed (desde la carpeta backend)
// ATENCION: borra el contenido actual de las colecciones antes de cargar los datos.

const mongoose = require('mongoose')
const { getMongoDBConnection } = require('./conexion')

const Autor = require('../Repositories/model/Autor')
const Categoria = require('../Repositories/model/Categoria')
const Ingrediente = require('../Repositories/model/Ingrediente')
const Receta = require('../Repositories/model/Receta')
const Menu = require('../Repositories/model/Menu')

// ---------------------------------------------------------------
// DATOS
// ---------------------------------------------------------------
const autores = [
  { apellido: 'Gonzalez', nombre: 'Laura', pais: 'Argentina' },
  { apellido: 'Silva', nombre: 'Ana', pais: 'Mexico' },
  { apellido: 'Rossi', nombre: 'Marco', pais: 'Italia' },
  { apellido: 'Dubois', nombre: 'Claire', pais: 'Francia' }
]

const categorias = [
  { nombre: 'Panaderia', descripcion: 'Panes, facturas y masas horneadas' },
  { nombre: 'Tartas', descripcion: 'Tartas dulces y saladas' },
  { nombre: 'Pastas', descripcion: 'Pastas frescas y secas con distintas salsas' },
  { nombre: 'Postres', descripcion: 'Dulces para cerrar la comida' }
]

const ingredientes = [
  { nombre: 'Harina', unidadMedida: 'gramos', calorias: 364 },
  { nombre: 'Huevo', unidadMedida: 'unidad', calorias: 78 },
  { nombre: 'Zapallito', unidadMedida: 'unidad', calorias: 17 },
  { nombre: 'Queso cremoso', unidadMedida: 'gramos', calorias: 300 },
  { nombre: 'Azucar', unidadMedida: 'gramos', calorias: 387 },
  { nombre: 'Leche', unidadMedida: 'mililitros', calorias: 42 },
  { nombre: 'Manteca', unidadMedida: 'gramos', calorias: 717 },
  { nombre: 'Tomate', unidadMedida: 'unidad', calorias: 22 },
  { nombre: 'Ajo', unidadMedida: 'diente', calorias: 4 },
  { nombre: 'Aceite de oliva', unidadMedida: 'mililitros', calorias: 884 },
  { nombre: 'Fideos', unidadMedida: 'gramos', calorias: 371 },
  { nombre: 'Levadura', unidadMedida: 'gramos', calorias: 325 },
  { nombre: 'Chocolate', unidadMedida: 'gramos', calorias: 546 },
  { nombre: 'Dulce de leche', unidadMedida: 'gramos', calorias: 328 },
  { nombre: 'Sal', unidadMedida: 'gramos', calorias: 0 }
]

// Las referencias se escriben por nombre/titulo y se resuelven a ObjectId al insertar.
const recetas = [
  {
    titulo: 'Tarta de zapallitos',
    descripcion: 'Tarta salada al horno con zapallitos, huevos y queso.',
    tiempoPreparacion: 50, porciones: 6, dificultad: 'facil',
    ingredientes: ['Harina', 'Huevo', 'Zapallito', 'Queso cremoso', 'Sal'],
    autor: 'Gonzalez', categoria: 'Tartas'
  },
  {
    titulo: 'Pan casero',
    descripcion: 'Pan de miga firme, ideal para el desayuno.',
    tiempoPreparacion: 120, porciones: 8, dificultad: 'media',
    ingredientes: ['Harina', 'Levadura', 'Sal', 'Aceite de oliva'],
    autor: 'Gonzalez', categoria: 'Panaderia'
  },
  {
    titulo: 'Fideos con salsa de tomate',
    descripcion: 'Clasico plato de fideos con salsa casera.',
    tiempoPreparacion: 30, porciones: 4, dificultad: 'facil',
    ingredientes: ['Fideos', 'Tomate', 'Ajo', 'Aceite de oliva', 'Sal'],
    autor: 'Rossi', categoria: 'Pastas'
  },
  {
    titulo: 'Pasta fresca al huevo',
    descripcion: 'Masa de pasta amasada a mano.',
    tiempoPreparacion: 90, porciones: 4, dificultad: 'dificil',
    ingredientes: ['Harina', 'Huevo', 'Sal'],
    autor: 'Rossi', categoria: 'Pastas'
  },
  {
    titulo: 'Brownie de chocolate',
    descripcion: 'Brownie humedo con chocolate y manteca.',
    tiempoPreparacion: 45, porciones: 9, dificultad: 'media',
    ingredientes: ['Chocolate', 'Manteca', 'Azucar', 'Huevo', 'Harina'],
    autor: 'Dubois', categoria: 'Postres'
  },
  {
    titulo: 'Flan casero',
    descripcion: 'Flan de huevo con dulce de leche.',
    tiempoPreparacion: 70, porciones: 8, dificultad: 'media',
    ingredientes: ['Huevo', 'Leche', 'Azucar', 'Dulce de leche'],
    autor: 'Silva', categoria: 'Postres'
  },
  {
    titulo: 'Tarta de tomate y queso',
    descripcion: 'Tarta salada con tomate fresco y queso cremoso.',
    tiempoPreparacion: 55, porciones: 6, dificultad: 'facil',
    ingredientes: ['Harina', 'Manteca', 'Tomate', 'Queso cremoso', 'Sal'],
    autor: 'Silva', categoria: 'Tartas'
  },
  {
    titulo: 'Medialunas de manteca',
    descripcion: 'Medialunas hojaldradas para la merienda.',
    tiempoPreparacion: 180, porciones: 12, dificultad: 'dificil',
    ingredientes: ['Harina', 'Manteca', 'Levadura', 'Azucar', 'Leche'],
    autor: 'Dubois', categoria: 'Panaderia'
  }
]

const menus = [
  {
    nombre: 'Desayuno clasico', tipoComida: 'desayuno',
    recetas: ['Pan casero', 'Medialunas de manteca']
  },
  {
    nombre: 'Almuerzo liviano', tipoComida: 'almuerzo',
    recetas: ['Tarta de zapallitos', 'Flan casero']
  },
  {
    nombre: 'Cena italiana', tipoComida: 'cena',
    recetas: ['Fideos con salsa de tomate', 'Pasta fresca al huevo']
  },
  {
    nombre: 'Merienda dulce', tipoComida: 'merienda',
    recetas: ['Brownie de chocolate', 'Medialunas de manteca']
  }
]

// ---------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------
// Arma un mapa clave -> _id a partir de los documentos insertados.
const mapaIds = (docs, campo) => new Map(docs.map(d => [d[campo], d._id]))

const resolver = (mapa, clave, tipo) => {
  const id = mapa.get(clave)
  if (!id) throw new Error(`Referencia inexistente: ${tipo} "${clave}"`)
  return id
}

// ---------------------------------------------------------------
// SEED
// ---------------------------------------------------------------
const seed = async () => {
  await getMongoDBConnection()

  // 1. Limpieza (primero las colecciones que referencian a otras)
  await Menu.deleteMany()
  await Receta.deleteMany()
  await Ingrediente.deleteMany()
  await Categoria.deleteMany()
  await Autor.deleteMany()

  // 2. Inserts (en orden de dependencias)
  const autoresDocs = await Autor.insertMany(autores)
  const categoriasDocs = await Categoria.insertMany(categorias)
  const ingredientesDocs = await Ingrediente.insertMany(ingredientes)

  const idAutor = mapaIds(autoresDocs, 'apellido')
  const idCategoria = mapaIds(categoriasDocs, 'nombre')
  const idIngrediente = mapaIds(ingredientesDocs, 'nombre')

  const recetasDocs = await Receta.insertMany(recetas.map(r => ({
    ...r,
    ingredientes: r.ingredientes.map(n => resolver(idIngrediente, n, 'ingrediente')),
    autor: resolver(idAutor, r.autor, 'autor'),
    categoria: resolver(idCategoria, r.categoria, 'categoria')
  })))

  const idReceta = mapaIds(recetasDocs, 'titulo')

  await Menu.insertMany(menus.map(m => ({
    ...m,
    recetas: m.recetas.map(t => resolver(idReceta, t, 'receta'))
  })))

  // 3. Verificacion
  console.log('\nDatos cargados:')
  console.log(`  Autores:      ${await Autor.countDocuments()}`)
  console.log(`  Categorias:   ${await Categoria.countDocuments()}`)
  console.log(`  Ingredientes: ${await Ingrediente.countDocuments()}`)
  console.log(`  Recetas:      ${await Receta.countDocuments()}`)
  console.log(`  Menus:        ${await Menu.countDocuments()}`)

  console.log('\nRecetas (titulo | autor | categoria):')
  const resumen = await Receta.find().populate('autor').populate('categoria')
  resumen.forEach(r =>
    console.log(`  ${r.titulo} | ${r.autor.nombre} ${r.autor.apellido} | ${r.categoria.nombre}`))
}

seed()
  .catch(error => {
    console.error('Error al cargar los datos:', error)
    process.exitCode = 1
  })
  .finally(() => mongoose.disconnect())

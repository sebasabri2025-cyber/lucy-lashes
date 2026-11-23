// =========================================================
// DATOS DEL NEGOCIO - LUCY LASHES
// Editá precios, servicios o multimedia desde acá fácilmente
// =========================================================

const CONFIG_LUCY = {
  nombreNegocio: "Lucy Lashes",
  whatsappNumero: "5492262225957", // Código país Argentina (54 9) + 2262 225957
  senaMonto: 10000,
  linkMercadoPago: "https://mpago.la/1b9nE7Q",
  aliasMP: "lucy.lashess10",
  cvuMP: "0000003100071948537330",
  titularMP: "Lucia Itati Rodriguez Cartoceti",
  direccion: "Av. 75 N° 736 (Playa)",
  horarios: "Lunes a viernes de 07:00 a 15:00 hs",
  duracionGeneral: "4 a 5 semanas"
};

// Listado de servicios con precios reales
const SERVICIOS_LUCY = [
  {
    id: "anime",
    nombre: "Pestañas Efecto Anime",
    categoriaPrecio: "25000",
    precio: 25000,
    duracion: "4 a 5 semanas",
    descripcion: "Picos definidos y mirada expresiva estilo editorial, adaptada a tu ojo."
  },
  {
    id: "tecnologicas",
    nombre: "Pestañas Tecnológicas",
    categoriaPrecio: "25000",
    precio: 25000,
    duracion: "4 a 5 semanas",
    descripcion: "Fibras tecnológicas ultrafinas y livianas con acabado impecable y duradero."
  },
  {
    id: "foxy",
    nombre: "Pestañas Efecto Foxy",
    categoriaPrecio: "28000",
    precio: 28000,
    duracion: "4 a 5 semanas",
    descripcion: "Mirada rasgada y alargada hacia el extremo exterior para un efecto delineado."
  },
  {
    id: "wispy",
    nombre: "Pestañas Efecto Wispy",
    categoriaPrecio: "28000",
    precio: 28000,
    duracion: "4 a 5 semanas",
    descripcion: "Textura con diferentes largos que aporta volumen aireado y naturalidad."
  },
  {
    id: "hibridas",
    nombre: "Pestañas Híbridas",
    categoriaPrecio: "28000",
    precio: 28000,
    duracion: "4 a 5 semanas",
    descripcion: "Combinación equilibrada entre pelo por pelo clásico y abanicos de volumen."
  },
  {
    id: "lifting",
    nombre: "Efecto Lifting",
    categoriaPrecio: "28000",
    precio: 28000,
    duracion: "4 a 5 semanas",
    descripcion: "Curvatura y elevación marcada que realza la apertura natural de tus ojos."
  },
  {
    id: "retoque",
    nombre: "Retoque de Set (a los 15 días)",
    categoriaPrecio: "retoque",
    precio: 15000,
    duracion: "Mantenimiento quincenal",
    descripcion: "Mantenimiento recomendado a los 15 días de la colocación para mantener el set completo."
  }
];

// Fotos y videos de trabajos (ubicados en la carpeta assets/)
const GALERIA_LUCY = [
  {
    tipo: "imagen",
    archivo: "assets/foto-volumen-01.png",
    titulo: "Set con volumen y curvatura definida"
  },
  {
    tipo: "imagen",
    archivo: "assets/foto-clasicas-01.png",
    titulo: "Acabado natural y delicado pelo por pelo"
  },
  {
    tipo: "video",
    archivo: "assets/video-proceso-lifting-anime.mp4",
    titulo: "Mini proceso: Efecto Lifting - Anime"
  },
  {
    tipo: "video",
    archivo: "assets/video-lifting-resultado.mp4",
    titulo: "Resultado final en primer plano"
  },
  {
    tipo: "video",
    archivo: "assets/video-antes-despues-01.mp4",
    titulo: "Transformación de mirada antes y después"
  },
  {
    tipo: "video",
    archivo: "assets/video-proceso-aplicacion.mp4",
    titulo: "Paso a paso de colocación y peinado final"
  }
];
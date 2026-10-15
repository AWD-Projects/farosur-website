export type Person = {
  slug: string;
  name: string;
  year: number;
  role?: string;
  story: string;
};

/** Historias del equipo, ordenadas por año de ingreso. Textos de la clienta. */
export const TEAM: Person[] = [
  {
    slug: "rosalba",
    name: "Rosalba",
    year: 2010,
    role: "Fundadora",
    story:
      "Comenzó costurando y aprendiendo de manera autodidacta la difícil tarea de confeccionar un traje de baño. Su primera formación fue con la marca italiana “La Perla”, para la cual trabajó durante 10 años; el día de hoy es diseñadora graduada. Disfruta mucho de su tiempo en familia.",
  },
  {
    slug: "ruth",
    name: "Ruth",
    year: 2010,
    role: "Fundadora",
    story:
      "Diseñadora, directora, madre y esposa. En 2006, emprendió el sueño de diseñar trajes de baño y fundó la marca BAROCCO, que desde entonces es marca líder en el departamento de playa de “El Palacio de Hierro”. Disfruta de compartir la vida en familia y del trabajo en compañía de otras mujeres.",
  },
  {
    slug: "antonio",
    name: "Antonio",
    year: 2010,
    role: "Fundador",
    story:
      "Padre amoroso de dos hijas. Su formación en administración, así como en tiempos y procesos, ha sido clave para la existencia de FaroSur. Le gusta disfrutar en familia, ser guía en actividades de equipo y compartir sus valores con los jóvenes de su iglesia. Es generoso y buen escucha, determinado y paciente en tiempos difíciles.",
  },
  {
    slug: "socorro",
    name: "Socorro Canul",
    year: 2010,
    story:
      "Comenzó costurando desde muy pequeña y cuando creció tenía la ilusión de saber cómo era una fábrica. Le gustó aprender cómo hacer trajes de baño, aunque muchas veces sintió que no iba a lograrlo, no se rindió. Actualmente hace la labor de elasticado, que es una de las operaciones más complicadas ya que requiere sensibilidad para llegar a las medidas y tensiones.",
  },
  {
    slug: "rita",
    name: "Rita Cauich",
    year: 2010,
    story:
      "Aprendió corte y confección en la escuela secundaria y posterior se sumó al equipo de operadores que convocaba su hermana Rosalba para fundar Faro Sur. Tiene 4 hijos y disfruta de pasar tiempo en familia y estar cerca de sus nietos. Rita realiza operaciones de detalle para colocación de herrajes.",
  },
  {
    slug: "glendy",
    name: "Glendy Canul",
    year: 2010,
    story:
      "Creció al lado de sus abuelos y comenzó a trabajar a los 19 años cuando su abuelo enfermó. En la secundaria aprendió a costurar en los talleres de corte y confección y es un oficio que disfruta, además de que lo hace con mucha agilidad. Es una madre amorosa y su pequeño Luis Abraham está por cumplir 2 años.",
  },
  {
    slug: "leticia",
    name: "Leticia Uc",
    year: 2012,
    story:
      "Comenzó en el área de control y corte manual de encajes, después aprendió a costurar y actualmente es supervisora de línea y muestrista. Hace 15 años, conoció a Florentino quien también labora en Faro Sur y están por cumplir 8 años de casados. El día de hoy su pequeña hija Cristelle de 6 años alegra sus días. Lety confecciona los trajes y vestidos con que Cristelle participa en el grupo de Jarana y ballet.",
  },
  {
    slug: "luisa",
    name: "Luisa May",
    year: 2014,
    story:
      "Tomó cursos de confección en Hunucmá, pero tiene ganas de seguir aprendiendo. En su tiempo libre le gusta costurar y hacer ropa para su familia, en particular los pantalones de su esposo que es pescador. Sigue trabajando porque le gusta mucho costurar y tener sus propios recursos.",
  },
  {
    slug: "teresa",
    name: "Teresa Solis",
    year: 2018,
    story:
      "La segunda de cinco hermanos. Su formación original es de estilismo, pero descubrió que disfruta mucho de hacer manualidades. Comenzó deshilando y el día de hoy es líder del área de control. Es mamá primeriza de un hermoso bebé de nombre Luciano que ya asiste a la guardería.",
  },
  {
    slug: "veronica",
    name: "Verónica Balam",
    year: 2018,
    story:
      "Desde que era pequeña veía a su mamá bordar los hipiles en una máquina Singer. Le gusta mucho el corte y la confección, le gustaría seguir aprendiendo. En sus ratos libres le gusta mucho ver las páginas de las marcas para las que costura y mirar cómo se ven las prendas terminadas.",
  },
  {
    slug: "concepcion",
    name: "Concepción Mex",
    year: 2020,
    story:
      "Le gustan los retos y aprender cosas nuevas. Se ha especializado en costurar las copas que tienen grado de dificultad por las curvas en el armado. Es casada y mamá de tres hijos. Disfruta mucho de hacer su propia ropa y la de su familia. Se caracteriza por sonreír todo el tiempo.",
  },
  {
    slug: "araceli",
    name: "Araceli Solis",
    year: 2023,
    story:
      "Comenzó en el área de control trabajando con su hermana Tere y disfruta mucho del dúo que forman, apoyándose una a la otra para lograr objetivos. Es mamá de Leandro e Isabela. Ha sido difícil enfrentar la vida sola pero no se siente triste, sino al contrario es feliz cuando mira a sus hijos crecer unidos en familia.",
  },
];

export const CLIENTS = [
  {
    slug: "barocco",
    name: "BAROCCO",
    image: "/images/clientes/barocco.jpg",
    alt: "Modelo sentada con traje de baño de una pieza y kimono largo estampados en azul, verde y negro, de la marca Barocco",
    href: "https://baroccoswimwear.com/",
    linkLabel: "baroccoswimwear.com",
    text: "Marca mexicana creada en el año 2006, por Ruth Ramírez, quien cuenta con una maestría en Artes Visuales y experiencia de 20 años en el ramo. La marca está dirigida a mujeres latinas y tiene una cadena de valor que incluye el proceso completo; desde el diseño de los estampados, hasta la distribución y venta en varios estados de la República Mexicana, a través de “El Palacio de Hierro”.",
  },
  {
    slug: "liech-antel",
    name: "LIECH ANTEL",
    image: "/images/clientes/liech-antel.jpg",
    alt: "Modelo con chamarra de piel café, lentes ámbar y traje de baño negro de tiras, de la marca Liech Antel",
    href: "https://www.liechantel.com/",
    linkLabel: "liechantel.com",
    text: "Creada por la diseñadora mexicana del mismo nombre. Actualmente la marca está presente en los hoteles y concept stores más exclusivos de México y Miami. Ha participado en “fashion shows”, a nivel nacional e internacional como Miami Swim Week, compartiendo pasarela con los mejores diseñadores del mundo y teniendo menciones en medios de prestigio como Forbes, Vogue, ESPN, NYPost, Quien, entre otros.",
  },
  {
    slug: "eurosol-concept",
    name: "EUROSOL CONCEPT",
    image: "/images/clientes/eurosol-concept.jpg",
    alt: "Modelo recostada en la playa con traje de baño estampado y blusa de malla azul, de la marca Eurosol Concept",
    href: "https://www.sears.com.mx",
    linkLabel: "sears.com.mx",
    text: "Marca mexicana que crea conceptos de playa para mujeres que buscan funcionalidad y control abdominal. Actualmente la marca es diseñada por Gricelda Zarco y se inspira en la flora y fauna tropical, creando estampados posicionados y exclusivos para la marca. De venta en exclusiva para Sears.",
  },
] as const;

export const SERVICES = [
  { id: "asesoria", title: "Asesoría", icon: "users" },
  { id: "desarrollo", title: "Desarrollo de producto", icon: "ruler" },
  { id: "muestrarios", title: "Muestrarios", icon: "shirt" },
  { id: "cursos", title: "Cursos y talleres", icon: "graduation" },
] as const;

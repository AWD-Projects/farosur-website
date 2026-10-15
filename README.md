# Faro Sur — sitio web

Sitio de Faro Sur construido con **Next.js 15 (App Router)**, TypeScript y Tailwind CSS. Desplegado en **Vercel**.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compilación de producción
npm run start    # sirve la compilación
```

## Variables de entorno

Copia `.env.example` a `.env.local` (local) o configúralas en Vercel → Settings → Environment Variables.

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Dominio final con `https://` (canonical, Open Graph, sitemap, JSON-LD). **Obligatoria en producción.** |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Código de verificación de Google Search Console (opcional). |

Los despliegues de vista previa (`VERCEL_ENV=preview`) se publican con `noindex` y `robots.txt` bloqueado para no competir con producción.

## Estructura

- `src/app`: layout, página, `robots`, `sitemap`, `manifest`, imágenes para compartir.
- `src/components`: secciones del sitio (Hero, Orígenes, Equipo, Impacto, Clientes, Servicios, Contacto).
- `src/lib/content.ts`: textos del equipo, clientes y servicios.
- `src/lib/site.ts`: datos de contacto y constantes.
- `src/lib/seo.ts`: datos estructurados (JSON-LD).
- `public/images`: fotografías optimizadas.

## Despliegue en Vercel

1. Importar el repositorio en Vercel (framework detectado: Next.js, sin configuración extra).
2. Agregar `NEXT_PUBLIC_SITE_URL` con el dominio real.
3. Asignar el dominio y, al cambiar el DNS, retirar el despliegue anterior.
4. Dar de alta el dominio en Google Search Console y enviar `/sitemap.xml`.


## Catálogo y cotizador (`/catalogo`)

- Datos de muestra en `src/data/products.ts` (61 modelos, **supuesto**: nombres, etiquetas y descripciones son de ejemplo hasta que Faro Sur entregue los reales). Las prendas se dibujan con `src/components/catalogo/garment.tsx` como marcador de posición; se sustituyen por las fotografías reales (principal, frente, espalda y costado).
- El cotizador guarda la lista en el navegador y envía la solicitud a `POST /api/cotizacion` (Resend).
- Variables de entorno (ver `.env.example`): `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL` (el remitente requiere dominio verificado en Resend) y, solo para pruebas, `QUOTE_DRY_RUN=1`.
- El envío no manda copia al cliente para no duplicar el consumo del plan gratuito (500 correos al mes).

## Firebase y fotos del catálogo

Proyecto Firebase: `faro-sur-app` (plan Spark por ahora). Las fotos se guardan comprimidas (WebP) en Firestore, colección `images`, y se sirven por `/media/[id]` con caché de un año; no se usa Cloud Storage. Es el mismo enfoque que Space.

- `src/lib/storage/images.ts`: guardar, leer y borrar fotos. Sin credenciales y fuera de producción usa `.local-data/uploads`.
- `src/app/api/upload/route.ts`: recibe la foto ya comprimida; exige `Authorization: Bearer ADMIN_UPLOAD_TOKEN` hasta que exista un panel con inicio de sesión.
- `src/lib/upload-client.ts`: comprime en el navegador y sube.
- `firestore.rules`: bloquea todo acceso directo de clientes; el servidor usa Admin SDK.
- Variables: ver `.env.example` (cuenta de servicio y token).

## Cargar los modelos oficiales de Faro Sur

El catálogo lee la colección `products` de Firestore. Mientras esté vacía muestra los 61 modelos de muestra de `src/data/products.ts` (no se suben a Firebase). En cuanto haya modelos en Firestore, esos son el catálogo; los filtros se arman solos con las categorías, tipos y géneros que traigan.

1. Llenar `scripts/plantilla-catalogo.csv` (una fila por modelo: `codigo,nombre,descripcion,categoria,tipo,genero,orden,activo`; `activo` = `no` oculta el modelo).
2. Poner las fotos en una carpeta con el código y el número: `FS-0001_1.jpg` (principal), `FS-0001_2.jpg`, … (3 a 5 por modelo).
3. Probar sin escribir nada: `node --env-file=.env.local scripts/import-catalog.mjs modelos.csv --fotos ./fotos --dry-run`
4. Cargar: `node --env-file=.env.local scripts/import-catalog.mjs modelos.csv --fotos ./fotos`

`.env.local` necesita `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL` y `FIREBASE_PRIVATE_KEY`. El script valida el archivo antes de subir, comprime las fotos a WebP (menos de 800 KB) y se puede repetir sin duplicar. El sitio se refresca solo en unos 5 minutos. Para agregar o actualizar un modelo después, se vuelve a correr con ese modelo en el archivo.

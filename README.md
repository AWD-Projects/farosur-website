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

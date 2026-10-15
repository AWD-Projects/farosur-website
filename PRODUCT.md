# PRODUCT.md — Faro Sur (rama dev-redesign-v2)

## Audiencia
Dueñas y dueños de marcas de trajes de baño, tiendas y distribuidores que buscan un taller que confeccione sus modelos (compra mínima de 25 piezas por modelo).

## Propósito
Mostrar el catálogo de modelos de Faro Sur y llevar a la persona a pedir una cotización (sin precios publicados). Acción secundaria: escribir por WhatsApp.

## Contexto de uso
Primera visita para evaluar un proveedor. Consulta en celular y escritorio. Elige varios modelos, deja nombre, correo y teléfono, y espera respuesta del equipo.

## Restricciones
- Colores y logo de Faro Sur intocables (paleta arena/arcilla, ink cálido, logo Montserrat).
- Requerimientos del PRD vigentes: catálogo desde Firestore con respaldo a datos de muestra, cotizador, honeypot, correo con Resend, imágenes en Firestore (`/media/[id]`).
- Solo dev/staging. Nada a producción sin aprobación.

## Voz
Cercana, directa, de taller. Español de México. Sin adjetivos de marketing; datos reales (2010, 10 personas, 450 mil prendas, 85 % mujeres).

## Evidencia (datos reales)
Textos de Orígenes, servicios, clientes y equipo provienen del sitio original del cliente. Los modelos y fotos del catálogo son de muestra hasta recibir los 61 modelos oficiales.

## A / B / C
A) Marca: cuidadosa, femenina sin ser dulce, de oficio.
B) Sector: la persona compara talleres, necesita ver rápido el rango de modelos y confiar en que se fabrica bien.
C) Función: catálogo + cotización. El catálogo es la estrella.

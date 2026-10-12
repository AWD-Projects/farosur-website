# DESIGN.md — Faro Sur v2

## 1. Visual Theme & Atmosphere
Editorial de moda: serif de alto contraste (Bodoni Moda) para títulos sobre fondo claro cálido; secciones oscuras (ink) para el catálogo y el impacto. Reglas finas, esquinas de 2 px, sin sombras decorativas. Grano muy sutil en el hero.
Diales: variación de composición 7, movimiento 6, densidad 5.

## 2. Color Palette & Roles
- `background` arena muy clara: fondo general.
- `surface` / `clay`: placas de imagen y retratos.
- `ink` (28 12% 14%): texto principal, botones sólidos, secciones oscuras, etiqueta de cotización.
- `muted`: texto secundario. `line`: reglas. `brand`: hover de acentos.
- Logo: tokens del cliente, sin cambios.

## 3. Typography Rules
- Display: Bodoni Moda (`.display`, `.title-hero` 2.9–6.4rem, `.section-title` 2.5–5.5rem, `.title-md`).
- Texto: Instrument Sans. Logo: Montserrat (solo logo).
- Sin etiquetas en mayúsculas ni numeración decorativa.

## 4. Component Stylings
- Botones: `.btn-solid` (ink), `.btn-line`, `.btn-light`; radio 2 px; barrido horizontal en hover.
- Tarjeta de modelo: placa 4:5, código en etiqueta cuadrada, nombre en display, botón de agregar.
- Filtros: filas de chips con conteo (escritorio) y panel lateral (móvil).
- Elemento firma: etiqueta de prenda (hang tag) con orificio y miniaturas de los modelos elegidos; entra con resorte.
- Diálogos: portal de Radix, radio 2 px, panel lateral para cotización y filtros.

## 5. Layout Principles
Retícula de 12 columnas, ancho máximo 82rem. Hero en dos columnas sin capas encimadas. Servicios como filas tipográficas. Catálogo: riel de 10 modelos con deriva lenta. Equipo: retratos con panel de historia fijo.

## 6. Depth & Elevation
Plano. Profundidad solo con contraste de fondo (ink vs claro), reglas y la etiqueta de cotización.

## 7. Do's and Don'ts
Do: título solo por sección; datos reales; un detalle de deleite (la etiqueta).
Don't: glassmorphism, blobs, subtítulos decorativos, numeración 01/02/03, palabras de la lista de vigilancia repetidas.

## 8. Responsive Behavior
Verificado a 1440, 1024, 768 y 390 px sin scroll horizontal. Menú móvil a pantalla completa. Con `prefers-reduced-motion` todo se anima a su estado final con duración 0.

## 9. Agent Prompt Guide
Mantener tokens HSL; no introducir colores nuevos. Cualquier componente nuevo usa radio 2 px, `display` para títulos y `ink` para énfasis. Revelados con `.reveal` (hay override en `noscript`).

## Referencias (qué se toma / qué se descarta)
- Moda editorial con serif de contraste: se toma el contraste de escala y las reglas finas; se descarta el fondo oscuro total.
- Cotizadores de catálogo mayorista: se toma la lista persistente de selección; se descarta el carrito con precios.
- Etiquetas de prenda físicas: se toma la forma y el orificio como metáfora del cotizador; se descarta el realismo (cordón, textura).
Diferencias con v1 (≥4): tipografía, forma (2 px vs redondeada), retícula asimétrica, filtros en chips, barra de cotización como etiqueta, secciones oscuras, servicios tipográficos.

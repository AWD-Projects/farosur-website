#!/usr/bin/env node
/**
 * Carga los modelos oficiales de Faro Sur a Firestore (colección `products`) y sus fotos
 * (colección `images`, comprimidas a WebP). Se puede repetir sin duplicar: mismo código = mismo documento.
 *
 * Uso:
 *   node --env-file=.env.local scripts/import-catalog.mjs modelos.csv --fotos ./fotos [--dry-run]
 *
 * modelos.csv  (ver scripts/plantilla-catalogo.csv)  columnas: codigo,nombre,descripcion,categoria,tipo,genero,orden,activo
 * fotos/       archivos con el código y el número de foto:  FS-0001_1.jpg, FS-0001_2.jpg, ...
 *              (la _1 es la principal; se aceptan jpg, png y webp)
 *
 * Necesita FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY (salvo con --dry-run).
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
const file = args.find((a) => !a.startsWith("--") && a !== opt("--fotos"));
const photosDir = opt("--fotos");
const dry = flag("--dry-run");

if (!file) {
  console.error("Falta el archivo de modelos.\nUso: node --env-file=.env.local scripts/import-catalog.mjs modelos.csv --fotos ./fotos [--dry-run]");
  process.exit(1);
}

const CODE_RE = /^[A-Za-z0-9][A-Za-z0-9._-]{1,59}$/;
const MAX_BYTES = 800 * 1024;

function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", q = false;
  const t = text.replace(/^﻿/, "");
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) {
      if (c === '"' && t[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === "," || c === ";") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && t[i + 1] === "\n") i++;
      row.push(cell); cell = "";
      if (row.some((x) => x.trim() !== "")) rows.push(row);
      row = [];
    } else cell += c;
  }
  row.push(cell);
  if (row.some((x) => x.trim() !== "")) rows.push(row);
  return rows;
}

const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

async function readModels() {
  const raw = await fs.readFile(file, "utf8");
  if (file.endsWith(".json")) return JSON.parse(raw);
  const [head, ...body] = parseCsv(raw);
  const keys = head.map(norm);
  return body.map((r) => Object.fromEntries(keys.map((k, i) => [k, (r[i] ?? "").trim()])));
}

async function compress(buf) {
  let quality = 82, width = 1600;
  for (let i = 0; i < 8; i++) {
    const out = await sharp(buf).rotate().resize({ width, height: width, fit: "inside", withoutEnlargement: true }).webp({ quality }).toBuffer();
    if (out.length <= MAX_BYTES) return out;
    quality = Math.max(50, quality - 8);
    if (quality <= 58) width = Math.round(width * 0.85);
  }
  throw new Error("No se pudo comprimir una foto por debajo de 800 KB.");
}

const errors = [];
const rows = (await readModels()).filter((r) => r.codigo && !String(r.codigo).toUpperCase().startsWith("EJEMPLO"));
const seen = new Set();
const models = [];
for (const [i, r] of rows.entries()) {
  const code = String(r.codigo).trim();
  const name = String(r.nombre ?? "").trim();
  if (!CODE_RE.test(code)) errors.push(`Fila ${i + 2}: código no válido "${code}" (usa letras, números, guion o punto).`);
  else if (seen.has(code)) errors.push(`Fila ${i + 2}: código repetido ${code}.`);
  if (!name) errors.push(`Fila ${i + 2} (${code}): falta el nombre.`);
  for (const k of ["categoria", "tipo", "genero"]) if (!String(r[k] ?? "").trim()) errors.push(`Fila ${i + 2} (${code}): falta ${k}.`);
  seen.add(code);
  models.push({
    code,
    name,
    description: String(r.descripcion ?? "").trim(),
    categoria: String(r.categoria ?? "").trim(),
    tipo: String(r.tipo ?? "").trim(),
    genero: String(r.genero ?? "").trim(),
    order: Number.isFinite(Number(r.orden)) && String(r.orden).trim() !== "" ? Number(r.orden) : i + 1,
    active: !/^(no|false|0)$/i.test(String(r.activo ?? "").trim()),
  });
}

// Fotos: <codigo>_<n>.<ext>
const photos = new Map();
if (photosDir) {
  for (const f of await fs.readdir(photosDir)) {
    const m = f.match(/^(.+?)[_-](\d{1,2})\.(jpe?g|png|webp)$/i);
    if (!m) continue;
    const code = [...seen].find((c) => c.toLowerCase() === m[1].toLowerCase());
    if (!code) { errors.push(`Foto sin modelo en la lista: ${f}`); continue; }
    if (!photos.has(code)) photos.set(code, []);
    photos.get(code).push({ n: Number(m[2]), path: path.join(photosDir, f) });
  }
  for (const list of photos.values()) list.sort((a, b) => a.n - b.n);
}
const noPhotos = models.filter((m) => !photos.has(m.code)).map((m) => m.code);

if (errors.length) {
  console.error("Hay errores, no se subió nada:\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log(`${models.length} modelos, ${[...photos.values()].reduce((a, l) => a + l.length, 0)} fotos.`);
if (photosDir && noPhotos.length) console.log(`Sin fotos (${noPhotos.length}): ${noPhotos.slice(0, 15).join(", ")}${noPhotos.length > 15 ? "…" : ""}`);

let db = null;
if (!dry) {
  const { cert, initializeApp } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");
  const key = (process.env.FIREBASE_PRIVATE_KEY ?? "").trim().replace(/\\n/g, "\n").replace(/^"|"$/g, "");
  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !key) {
    console.error("Faltan FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL o FIREBASE_PRIVATE_KEY.");
    process.exit(1);
  }
  initializeApp({ credential: cert({ projectId: process.env.FIREBASE_PROJECT_ID, clientEmail: process.env.FIREBASE_CLIENT_EMAIL, privateKey: key }) });
  db = getFirestore();
  console.log(`Proyecto: ${process.env.FIREBASE_PROJECT_ID}`);
}

let done = 0;
for (const m of models) {
  const urls = [];
  for (const ph of photos.get(m.code) ?? []) {
    const data = await compress(await fs.readFile(ph.path));
    const id = `p-${m.code.toLowerCase()}-${ph.n}.webp`;
    urls.push(`/media/${id}`);
    if (db) await db.doc(`images/${id}`).set({ contentType: "image/webp", size: data.length, bytes: data, createdAt: Date.now() });
  }
  const doc = { ...m, ...(urls.length ? { photos: urls } : {}), updatedAt: Date.now() };
  if (db) await db.doc(`products/${m.code}`).set(doc, { merge: true });
  done++;
  if (done % 10 === 0 || done === models.length) console.log(`${done}/${models.length}`);
}
console.log(dry ? "Prueba terminada: no se escribió nada en Firebase." : "Listo. El catálogo se actualiza solo en unos 5 minutos (o al hacer redeploy).");

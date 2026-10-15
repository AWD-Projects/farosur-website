/** Configuración pública de la app web de Firebase (proyecto faro-sur-app). No contiene secretos. */
export const firebaseClientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyCv7400GNWVe0QE6nVXMmsaTJBwc5EXmfw",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "faro-sur-app.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "faro-sur-app",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "faro-sur-app.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "443466962809",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:443466962809:web:394833c1f2cbd48ed601a8",
};

/** Credenciales del servidor (cuenta de servicio). Se leen sin cargar el SDK. */
export function privateKey() {
  const key = process.env.FIREBASE_PRIVATE_KEY ?? "";
  return key.trim().replace(/\\n/g, "\n").replace(/^"|"$/g, "");
}

export const hasFirebaseAdmin = () =>
  Boolean(process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY);

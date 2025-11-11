import type { Route } from "./+types/firebase-config.js";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

let envHydrated = false;

function hydrateEnvFromFile() {
  if (envHydrated) {
    return;
  }

  if (process.env.FIREBASE_API_KEY || process.env.GEMINI_API_KEY) {
    envHydrated = true;
    return;
  }

  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) {
    envHydrated = true;
    return;
  }

  const fileContents = readFileSync(envPath, "utf8");
  for (const rawLine of fileContents.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    if (!key || process.env[key]) {
      continue;
    }

    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");
    process.env[key] = value;
  }

  envHydrated = true;
}

const defaultConfig = {
  authDomain: "nutriquest-6c40d.firebaseapp.com",
  projectId: "nutriquest-6c40d",
  storageBucket: "nutriquest-6c40d.firebasestorage.app",
  messagingSenderId: "893360379713",
  appId: "1:893360379713:web:4f7952bf9094caf139b3c0",
  measurementId: "G-C9V61B19G7"
};

export async function loader(_args: Route.LoaderArgs) {
  hydrateEnvFromFile();

  const apiKey = process.env.FIREBASE_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return new Response(
      'console.error("Firebase API key is not configured. Please set the FIREBASE_API_KEY environment variable.");',
      {
        status: 500,
        headers: {
          "Content-Type": "application/javascript",
          "Cache-Control": "no-store, max-age=0"
        }
      }
    );
  }

  const firebaseConfig = {
    apiKey,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || defaultConfig.authDomain,
    projectId: process.env.FIREBASE_PROJECT_ID || defaultConfig.projectId,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || defaultConfig.storageBucket,
    messagingSenderId:
      process.env.FIREBASE_MESSAGING_SENDER_ID || defaultConfig.messagingSenderId,
    appId: process.env.FIREBASE_APP_ID || defaultConfig.appId,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || defaultConfig.measurementId
  };

  const serializedConfig = JSON.stringify(firebaseConfig);

  return new Response(`window.__FIREBASE_CONFIG__ = ${serializedConfig};`, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "no-store, max-age=0"
    }
  });
}
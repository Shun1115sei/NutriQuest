const defaultConfig = {
  authDomain: 'nutriquest-6c40d.firebaseapp.com',
  projectId: 'nutriquest-6c40d',
  storageBucket: 'nutriquest-6c40d.firebasestorage.app',
  messagingSenderId: '893360379713',
  appId: '1:893360379713:web:4f7952bf9094caf139b3c0',
  measurementId: 'G-C9V61B19G7'
};

export default function handler(_req, res) {
  const apiKey = process.env.FIREBASE_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    res.setHeader('Content-Type', 'application/javascript');
    return res
      .status(500)
      .send(
        'console.error("Firebase API key is not configured. Please set the FIREBASE_API_KEY environment variable.");'
      );
  }

  const firebaseConfig = {
    apiKey,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || defaultConfig.authDomain,
    projectId: process.env.FIREBASE_PROJECT_ID || defaultConfig.projectId,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || defaultConfig.storageBucket,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || defaultConfig.messagingSenderId,
    appId: process.env.FIREBASE_APP_ID || defaultConfig.appId,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || defaultConfig.measurementId
  };

  const serializedConfig = JSON.stringify(firebaseConfig);

  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  return res.status(200).send(`window.__FIREBASE_CONFIG__ = ${serializedConfig};`);
}
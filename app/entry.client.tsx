import * as React from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { AuthProvider } from "./firebaseconfig";
import "./globals.css"

hydrateRoot(
  document,
  <React.StrictMode>
    <AuthProvider>
      <HydratedRouter />
    </AuthProvider>
  </React.StrictMode>
);

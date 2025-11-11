import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes"

export default [
  index("./app.tsx"),
  route("test", "./app2.tsx"),
  route("api/firebase-config.js", "./firebase-config.ts"),
  route("api/gemini/getnutriinfo/v1", "./gemininutrition.ts"),
  route("api/gemini/identifyfood/v1", "./geminiidentify.ts"),
  route("api/firebase-config", "./firebase-config.js")

] satisfies RouteConfig;

import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes"

export default [
  index("./app.tsx"),
  route("login", "./login.tsx"),
  route("signup", "./signup.tsx"),
  route("api/gemini/getnutriinfo/v1", "./gemininutrition.ts"),
  route("api/gemini/identifyfood/v1", "./geminiidentify.ts"),
] satisfies RouteConfig;

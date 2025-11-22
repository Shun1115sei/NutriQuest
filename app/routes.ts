import {
  type RouteConfig,
  route,
  index,
} from "@react-router/dev/routes"

export default [
  index("./app.tsx"),
  route("login", "./login.tsx"),
  route("signup", "./signup.tsx"),
  route("api/gemini/getnutriinfo/v1", "./gemininutrition.ts"),
  route("api/gemini/identifyfood/v1", "./geminiidentify.ts"),
  route("api/gemini/nutritionadvice/v1", "./geminiadvice.ts"),
] satisfies RouteConfig;

import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes"

export default [
  index("./staticdashboardredirect.tsx"),
  route("login", "./login.tsx"),
  route("signup", "./signup.tsx"),
  route("dashboard2", "./dashboard2/page.tsx"),
  route("api/gemini/getnutriinfo/v1", "./gemininutrition.ts"),
  route("api/gemini/identifyfood/v1", "./geminiidentify.ts"),
  route("api/gemini/nutritionadvice/v1", "./geminiadvice.ts"),
] satisfies RouteConfig;

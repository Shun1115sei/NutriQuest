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
  route("api/gemini/getnutriinfo/v1", "./gemininutrition.ts")
] satisfies RouteConfig;

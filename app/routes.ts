import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes"

export default [
  index("./app.tsx"),
  route("testing", "./app2.tsx")
] satisfies RouteConfig;
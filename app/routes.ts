import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/dashboard.tsx"),
  route("/setting", "routes/setting.tsx"),
] satisfies RouteConfig;
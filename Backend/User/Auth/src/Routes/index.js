import authRouter from "./routes/auth.routes.js";
import rentRouter from "./routes/rent.routes.js";

const routes = [
  {
    path: "/",
    router: authRouter,
  },
  {
    path: "/rent",
    router: rentRouter,
  },
];

const applyRoutes = (app) => {
  routes.forEach((route) => {
    app.use(route.path, route.router);
  });
};

export default applyRoutes;

import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";
// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use("/*", cors());
app.get("/", (c) => {
  return c.text("Backend is available");
});
app.route("api/v1/user", userRouter);
app.route("api/v1/blog", blogRouter);

app.use("/message/*", async (c, next) => {
  await next();
});

export default app;

import { Hono } from "hono";
import { verify } from "hono/jwt";

import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();

app.use("/api/v1/blog/*", async (c, next) => {
  const header = c.req?.header("Authentication") || "";
  const token = header?.split(" ")[1];
  const response = await verify(token, c.env.JWT_SECRET_KEY);
  if (response.id) {
    next();
  } else {
    c.status(403);
    return c.json({ error: "Authorized" });
  }
});
app.get("/", (c) => {
  return c.text("Backend is available");
});

app.route("api/v1/user", userRouter);
app.route("api/v1/blog", blogRouter);
export default app;

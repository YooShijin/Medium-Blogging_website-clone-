import { Hono } from "hono";
import { jwt, sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();
app.get("/", (c) => {
  return c.text("Backend is available");
});

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        email: body.username,
        password: body.password,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET_KEY);
    return c.json({ jwt });
  } catch (e) {
    c.status(403);
    return c.json({ error: "Error while signing up" });
  }
});
app.post("/api/v1/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    c.status(403);
    return c.json({ error: "Invalid email or password" });
  }
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET_KEY);
  return c.json({ jwt });
});

app.post("/api/v1/blog", (c) => c.text("POST /"));

app.put("/api/v1/blog", (c) => c.text("PUT /"));

app.get("/api/v1/blog/:id", (c) => {
  const { id: userid } = c.req.param();
  return c.json({ message: `Blog with id ${userid} retrieved successfully!` });
});

app.get("/api/v1/blog/bulk", (c) => {
  // Implement bulk retrieval logic here
  return c.json({ message: "Blogs retrieved successfully!" });
});

export default app;

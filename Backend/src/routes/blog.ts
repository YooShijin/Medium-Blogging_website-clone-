import { Hono } from "hono";
import { jwt, sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();

blogRouter.post("/", (c) => {
  c.text("POST /");
  return c.json({ message: "Success!" });
});

blogRouter.put("/", (c) => {
  c.text("PUT /");
  return c.json({ message: "Success!" });
});

blogRouter.get("/:id", (c) => {
  const { id: userid } = c.req.param();
  return c.json({ message: `Blog with id ${userid} retrieved successfully!` });
});

blogRouter.get("/bulk", (c) => {
  // Implement bulk retrieval logic here
  return c.json({ message: "Blogs retrieved successfully!" });
});

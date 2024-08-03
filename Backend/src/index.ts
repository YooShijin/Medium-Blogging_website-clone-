import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// POST /api/v1/user/signup
// POST /api/v1/user/signin
// POST /api/v1/blog
// PUT /api/v1/blog
// GET /api/v1/blog/:id
// GET /api/v1/blog/bulk

app.post("/api/v1/user/signup", (c) => {
  // Implement signup logic here
  return c.json({ message: "User signed up successfully!" });
});
app.post("/api/v1/user/signin", (c) => {
  // Implement signin logic here
  return c.json({ message: "User signed in successfully!" });
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

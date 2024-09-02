import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorname={blog.author.name || "John Doe"}
              title={blog.title}
              content={blog.content}
              publishedDate={getRandomDateWithoutYear()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

function getRandomDateWithoutYear(): string {
  const start = new Date("2024-01-01").getTime();
  const end = new Date("2024-12-31").getTime();
  const randomTime = new Date(start + Math.random() * (end - start));

  return randomTime.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
}

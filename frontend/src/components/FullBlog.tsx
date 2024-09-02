import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";
interface FullBlogInterface {
  blog: Blog;
}
export const FullBlog = ({ blog }: FullBlogInterface) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 w-full px-10 pt-20 max-w-screen-xl ">
          <div className="col-span-8">
            <div className="text-3xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-3">Posted on 23rd June 2023</div>
            <div className="">{blog.content}</div>
          </div>

          <div className="col-span-4">
            <div className="flex items-center gap-4">
              <Avatar size={"small"} name={blog.author.name || "Anonymous"} />
              <div className="text-slate-600 text-lg">Author</div>
            </div>

            <div className="flex">
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the author's ability to grab the
                  user's attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

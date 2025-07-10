import PostListClient from "@/components/PostListClient";
import { connectToDB } from "@/lib/utils/db/connectToDB";

const posts = [
  {
    author: "John Doe",
    title: "5 CSS tricks",
  },
  {
    author: "Victor Wallace",
    title: "How to code a navbar",
  },
  {
    author: "Bruce Willis",
    title: "How to setup TypeScript",
  },
]

const now = new Date();
const isoDate = now.toISOString();
const readableDate = now.toLocaleDateString("en-EN", {year: "numeric", month: "long", day: "numeric"});

export default async function Home() {

  await connectToDB();

  return (
    <div className="u-main-container u-padding-content-container">
      <h1 className="t-main-title">Stay up to date with AXORIA.</h1>
      <p className="t-main-subtitle">Tech news and useful knowledge</p>
      <p className="text-zinc-900">Latest articles</p>
      <PostListClient posts={posts} isoDate={isoDate} readableDate={readableDate} />
    </div>
  )
}

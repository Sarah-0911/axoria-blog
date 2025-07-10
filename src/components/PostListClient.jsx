"use client"

import Link from "next/link";

export default function PostListClient({ posts, isoDate, readableDate }) {
  return (
    <ul className="u-articles-grid">
        {posts.map((post, id) => (
          <li key={id} className="rounded-sm shadow-md border hover:shadow-xl hover:border hover:border-zinc-300">
            <div className="pt-5 px-5 pb-7">
              <div className=" flex items-baseline gap-x-4 text-xs">
                <time
                dateTime={isoDate}
                className="text-gray-500 text-sm"
                >
                  {readableDate}
                </time>
                <Link
                href={`/categories/author/${post.author}`}
                className="ml-auto text-base text-gray-700 hover:text-gray-600 whitespace-nowrap truncate"
                >
                  {post.author}
                </Link>
              </div>
              <div className="">
                <Link
                href={`/article/${post.title}`}
                className="inline-block mt-6 text-xl font-semibold text-zinc-800 hover:text-zinc-600"
                >
                  {post.title}
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
  )
}

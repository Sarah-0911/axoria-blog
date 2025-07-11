"use client"
import { addPost } from "@/lib/serverActions/blog/postServerActions";
import { useState, useRef } from "react";

export default function page() {

  const [tags, setTags] = useState(["css", "javascript"]);
  const tagInputRef = useRef();
  console.log(tagInputRef.current);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const result = await addPost(formData);
    console.log(result);
  }

  const handleAddTag = () => {

  }

  const handleRemoveTag = (currentTag) => {

  }

  return (
    <section className="u-main-container bg-white p-7 mt-32 mb-44">
      <h1 className="text-3xl mb-4">Write an article 📝</h1>
      <form onSubmit={handleSubmit} className="pb-6">

        <label htmlFor="title" className="f-label">Title</label>
        <input
        type="text"
        name="title"
        className="shadow border rounded w-full p-3 mb-7 text-gray-700 focus:outline-slate-400"
        id="title"
        placeholder="Title"
        required
         />

        <div className="mb-10">
          <label htmlFor="tag" className="f-label">Add a tag(s) (optionnal, max5)</label>
          <div className="flex gap-4">
            <input
            ref={tagInputRef}
            type="text"
            className="shadow border rounded p-3 text-gray-700 focus:outline-slate-400"
            id="tag"
            placeholder="Add a tag"
            />
            <button
            className="bg-indigo-500 hover:bg-indigo-700 p-4 text-white font-bold rounded"
            onClick={handleAddTag}
            type="button" // type spécifié car on est dans un formulaire et dc submit par défaut (ms pas ce qu'on veut ici)
            >
              Add
            </button>
            <div className="flex gap-2 items-center grow whitespace-nowrap overflow-y-auto shadow border rounded px-3">
              {tags.map(tag => (
                <span
                key={tag}
                className="inline-block whitespace-nowrap bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold"
                >
                  {tag}
                  <button
                  className="text-red-500 ml-2"
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <label htmlFor="markdownArticle" className="f-label">
          Write your article using markdown - do not repeat the already given title
        </label>
        <a
        href="https://www.markdownguide.org/cheat-sheet/"
        target="_blank"
        className="block mb-4 text-blue-600 text-sm hover:underline"
        >
          How to use the markdown syntax ?
        </a>
        <textarea
        name="markdownArticle"
        className="min-h-44 appearance-none shadow border rounded w-full p-8 mb-4 text-gray-700 focus:outline-slate-400"
        id="markdownArticle"
        required
        >
        </textarea>

        <button
        className="min-w-44 bg-indigo-500 hover:bg-indigo-700 text-white font-bold p-3 rounded border-none mb-4"
        >
          Submit
        </button>
      </form>
    </section>
  )
}

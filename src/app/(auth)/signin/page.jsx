"use client"
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function page() {

  const serverInfoRef = useRef(null);
  const submitButtonRef = useRef(null);

  const handleSubmit = () => {
    e.preventDefault()
  }

  return (
<form
    onSubmit={handleSubmit}
    className="max-w-md mx-auto mt-28"
    >
      <label htmlFor="userName" className="f-label">
        Your pseudo
      </label>
      <input
      type="text"
      className="f-auth-input"
      id="userName"
      name="userName"
      placeholder="Name or pseudo"
      required
       />

      <label htmlFor="password" className="f-label">
        Your password
      </label>
      <input
      type="password"
      className="f-auth-input"
      id="password"
      name="password"
      placeholder="Your password"
      required
       />

       <button
       ref={submitButtonRef}
       className="w-full bg-indigo-500 hover:bg-indigo-700 text-white rounded font-bold py-3 px-4 my-6 border-none"
       >
        Submit
       </button>
       <p ref={serverInfoRef} className="text-center mb-10"></p>
    </form>
  )
}

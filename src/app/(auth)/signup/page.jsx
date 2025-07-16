"use client"
import { register } from "@/lib/serverActions/session/sessionServerActions";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function page() {

  const serverInfoRef = useRef(null);
  const submitButtonRef = useRef(null);
  
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    serverInfoRef.current.classList.add("hidden");
    serverInfoRef.current.textContent = "";
    submitButtonRef.current.textContent = "Saving User...";
    submitButtonRef.current.disabled = true;

    try {
      const result = await register(new FormData(e.target));

      if (result.success) {
        submitButtonRef.current.textContent = "User created ✅"
        let countDown = 3;
        serverInfoRef.current.classList.remove("hidden");
        serverInfoRef.current.textContent = `Redirecting in ${countDown}...`;

        const intervalId = setInterval(() => {
          countDown --;
          serverInfoRef.current.textContent = `Redirecting in ${countDown}...`;
          if (countDown === 0) {
            clearInterval(intervalId);
            router.push("/signin")
          }
        }, 1000);
      }
    }
    catch (error) {
      submitButtonRef.current.textContent = "Submit";
      serverInfoRef.current.textContent = `${error.message}`;
      submitButtonRef.current.disabled = false;
    }
  }

  return (
    <form
    onSubmit={handleSubmit}
    className="max-w-md mx-auto mt-28"
    >
      <label htmlFor="userName" className="f-label">
        Name or pseudo
      </label>
      <input
      type="text"
      className="f-auth-input"
      id="userName"
      name="userName"
      placeholder="Name or pseudo"
      required
       />

      <label htmlFor="email" className="f-label">
        E-mail
      </label>
      <input
      type="email"
      className="f-auth-input"
      id="email"
      name="email"
      placeholder="Email"
      required
       />

      <label htmlFor="password" className="f-label">
        Password
      </label>
      <input
      type="password"
      className="f-auth-input"
      id="password"
      name="password"
      placeholder="Your password"
      required
       />

      <label htmlFor="passwordConfirm" className="f-label">
        Confirm Password
      </label>
      <input
      type="password"
      className="f-auth-input"
      id="passwordConfirm"
      name="passwordConfirm"
      placeholder="Confirm password"
      required
       />

       <button
       ref={submitButtonRef}
       className="w-full bg-indigo-500 hover:bg-indigo-700 text-white rounded font-bold py-3 px-4 my-6 border-none"
       >
        Submit
       </button>
       <p ref={serverInfoRef} className="hidden text-center mb-10"></p>
       <a href="/signin" className="mb-5 underline text-blue-600 block text-center">
        Already have an account ? Log in
       </a>
    </form>
  )
}

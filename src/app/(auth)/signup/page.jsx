export default function page() {
  return (
    <form
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
       className="w-full bg-indigo-500 hover:bg-indigo-700 text-white rounded font-bold py-3 px-4 my-6 border-none">
        Submit
       </button>
       <a href="/signin" className="mb-5 underline text-blue-600 block text-center">
        Already have an account ? Log in
       </a>
    </form>
  )
}

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-slate-50 border-b border-zinc-300">
      <div className="u-main-container flex py-4 gap-4 text-zinc-900">
        <Link href="/">AXORIA</Link>
        <Link href="/categories" className="mr-auto">Categories</Link>
        <Link href="/dashboard/create">Add an article</Link>
        <Link href="/signin">Sign in</Link>
        <Link href="/signup">Sign up</Link>
      </div>
    </nav>
  )
}

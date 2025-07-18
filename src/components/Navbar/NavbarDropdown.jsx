"use client"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/serverActions/session/sessionServerActions"

export default function NavbarDropdown() {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current.contains(e.target)) setIsOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
    
  }, [])

  const handleLogout = async () => {
    await logout();
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={toggleDropdown}
        className="flex">
        <Image
          src="icons/user.svg"
          alt=""
          width={20}
          height={20}
        />
      </button>
      {isOpen && (
        <ul className="absolute right-0 top-10 w-[250px] border-b border-x border-zinc-300">
          <li className="bg-slate-50 hover:bg-slate-200 border-b border-slate-200">
            <Link
            onClick={() => setIsOpen(false)} 
            href="/dashboard"
            className="block px-4 py-3"
            >
              Dashboard
            </Link>
          </li>
          <li className="bg-slate-50 hover:bg-slate-200">
            <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-left"
            >
              Sign out
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
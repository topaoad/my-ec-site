"use client";

// components/Header.tsx
import { useState } from "react";
import { Menu } from "@shadcn/ui";
// import { MenuIcon } from "@heroicons/react/outline";
// import { MenuItem } from "../types";
import Link from "next/link";
import { client } from "@/app/libs/client";
export interface MenuItem {
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Services", href: "#" },
  { label: "Contact", href: "#" },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="text-2xl font-bold">MyLogo</div>
        <nav className="hidden md:flex space-x-4">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-gray-300"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {/* <MenuIcon className="w-8 h-8" /> */}
            hogehoge
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-4 py-2 hover:bg-gray-700"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;

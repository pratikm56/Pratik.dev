import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  if (menuOpen) {
  document.body.style.overflow = "hidden";
} else {
  document.body.style.overflow = "auto";
}
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/60 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo (scrolls to hero) */}
        <a href="#home"
          className="cursor-pointer text-2xl font-bold tracking-wide text-blue-400 hover:text-blue-300 transition"
        >
          BuildWithPratik
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-gray-300 font-medium">

          <a href="#about" className="hover:text-blue-400 transition">
            About
          </a>

          <a href="#skills" className="hover:text-blue-400 transition">
            Skills
          </a>

          <a href="#projects" className="hover:text-blue-400 transition">
            Projects
          </a>

          <a href="#education" className="hover:text-blue-400 transition">
            Education
          </a>

          <a href="#contact" className="hover:text-blue-400 transition">
            Contact
          </a>

        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
  <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10 flex flex-col items-center py-6 gap-6 text-lg font-medium">

    <a
      href="#about"
      onClick={()=>setMenuOpen(false)}
      className="hover:text-blue-400 transition"
    >
      About
    </a>

    <a
      href="#skills"
      onClick={()=>setMenuOpen(false)}
      className="hover:text-blue-400 transition"
    >
      Skills
    </a>

    <a
      href="#projects"
      onClick={()=>setMenuOpen(false)}
      className="hover:text-blue-400 transition"
    >
      Projects
    </a>

    <a
      href="#contact"
      onClick={()=>setMenuOpen(false)}
      className="hover:text-blue-400 transition"
    >
      Contact
    </a>

  </div>
)}
    </nav>
  );
}
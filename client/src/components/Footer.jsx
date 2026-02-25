import { FaHeart, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-gray-400 py-10 mt-20">

      <div className="max-w-6xl mx-auto px-6 text-center space-y-6">

        {/* Name */}
        <h2 className="text-2xl text-white font-semibold">
          Pratik.dev
        </h2>

        {/* Social Links */}
        <div className="flex justify-center gap-6 text-xl">
          <a
            href="https://github.com/YOUR_GITHUB_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaGithub />
          </a>

          <a
            href="https://linkedin.com/in/YOUR_LINKEDIN_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaLinkedin />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm">
          © {new Date().getFullYear()} All rights reserved
        </p>

        {/* Made with love */}
        <p className="text-sm flex items-center justify-center gap-2">
          Made with <FaHeart className="text-red-500" /> by
          <span className="text-white font-medium"> Pratik</span>
        </p>

      </div>
    </footer>
  );
}
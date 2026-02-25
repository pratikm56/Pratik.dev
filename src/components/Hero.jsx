import { TypeAnimation } from "react-type-animation";
import profile from "../assets/profile.png";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Hero() {
  return (
    <section id="home" className="h-screen pt-24 flex flex-col justify-center items-center ...text-center px-6">
        <img
        src={profile}
        alt="Pratik"
        className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-lg mb-6 object-cover"
        />

      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
        Hi, I'm <span className="text-blue-400">Pratik</span>
      </h1>

        <div className="text-2xl mt-4 text-gray-300">
        <TypeAnimation
        sequence={[
        "MERN Stack Developer",
        1500,
        "AI Enthusiast",
        1500,
        "Full Stack Web Developer",
        1500,
        "Problem Solver",
        1500,
        ]}
        speed={50}
        repeat={Infinity}
        />
        </div>

      <p className="mt-6 max-w-2xl text-gray-400">
        Motivated Software Developer with a strong foundation in Java, Python, and
        JavaScript. Experienced in designing responsive, AI-integrated web
        applications and deploying cloud-native database solutions using Microsoft
        Azure. Seeking to leverage analytical problem-solving skills and full-stack
        expertise to drive impactful software projects and contribute to innovative development teams.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        <a href="#about"
           className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition">
          Know About Me
        </a>

        <a href="/resume.pdf" download
           className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black transition">
          Download Resume
        </a>
      </div>

        <div className="flex gap-6 mt-10 text-2xl">

        <a
        href="https://github.com/pratikm56"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-400 transition"
        >
        <FaGithub />
        </a>

        <a
        href="https://www.linkedin.com/in/pratik-mungaravadi-2a62a0329/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-400 transition"
        >
        <FaLinkedin />
        </a>

        <a
        href="mailto:pratikmungaravadi8296@gmail.com"
        className="hover:text-blue-400 transition"
        >
        <FaEnvelope />
        </a>

        </div>

    </section>
  );
}
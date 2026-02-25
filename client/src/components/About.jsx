export default function About() {
  return (
    <section id="about" className="py-28 bg-gradient-to-b from-black to-gray-900 text-white px-6">

      <h2 className="text-4xl font-bold text-center mb-14">About Me</h2>

      <div className="max-w-5xl mx-auto backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-10 shadow-xl">

        <p className="text-lg leading-relaxed text-gray-300">
          I'm <span className="text-blue-400 font-semibold">Pratik Mungaravadi</span>, 
          a passionate Full Stack Developer specializing in the MERN stack.
          I enjoy building real-world applications and integrating AI features into web platforms.
        </p>

        <p className="text-lg leading-relaxed text-gray-300 mt-6">
          I have strong fundamentals in Java, JavaScript, and Python. 
          I love problem solving and continuously improving my development skills.
          My goal is to work as a Software Developer where I can contribute to meaningful projects and grow as an engineer.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
            <h3 className="text-blue-400 text-2xl font-bold">10+</h3>
            <p className="text-gray-400">Technologies Learned</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
            <h3 className="text-blue-400 text-2xl font-bold">3+</h3>
            <p className="text-gray-400">Major Projects</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
            <h3 className="text-blue-400 text-2xl font-bold">Open</h3>
            <p className="text-gray-400">To Opportunities</p>
          </div>

        </div>

      </div>
    </section>
  );
}
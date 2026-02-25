export default function Projects() {

  const projects = [
    {
      title: "FilmyAdda",
      desc: "Full stack movie streaming web app with search and responsive UI.",
      tech: ["React", "Node", "Express", "MongoDB"]
    },
    {
      title: "TextFlow",
      desc: "Advanced text manipulation tool with live preview and statistics.",
      tech: ["React", "JavaScript"]
    },
    {
      title: "FlappyBird",
      desc: "Desktop game built with physics and collision detection.",
      tech: ["Python", "Pygame"]
    }
  ];

  return (
    <section id="projects" className="py-28 bg-gradient-to-b from-gray-900 to-black text-white px-6">

      <h2 className="text-4xl font-bold text-center mb-16">Projects</h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {projects.map((project, index) => (
          <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg hover:-translate-y-2 transition duration-300 shadow-xl">

            <h3 className="text-2xl font-semibold text-blue-400 mb-4">{project.title}</h3>
            <p className="text-gray-300 mb-6">{project.desc}</p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span key={i} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                  {t}
                </span>
              ))}
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}
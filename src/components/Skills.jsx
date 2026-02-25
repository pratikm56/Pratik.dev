export default function Skills() {

  const skills = [
    "React", "Node.js", "Express.js", "MongoDB",
    "JavaScript", "Java", "Python", "HTML",
    "CSS", "Tailwind", "Git", "REST API"
  ];

  return (
    <section id="skills" className="py-28 bg-black text-white px-6">

      <h2 className="text-4xl font-bold text-center mb-16">Technical Skills</h2>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">

        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:scale-105 transition duration-300 shadow-lg"
          >
            <p className="text-lg font-semibold text-gray-200">{skill}</p>
          </div>
        ))}

      </div>
    </section>
  );
}
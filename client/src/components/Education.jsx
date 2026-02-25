import React from "react";

const Education = () => {
  const educationData = [
    {
        degree: "Master of Computer Applications (MCA)",
        college: "New Horizon College of Engineering, Bengaluru",
        year: "2025 – 2027",
        desc: "Specializing in advanced web technologies, cloud computing, and AI. Currently working on a thesis about scalable web architectures."
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      college: "KLE's GH BCA COLLEGE ,Haveri",
      year: "2022 – 2025",
      desc: "Focused on web development, databases, and software engineering. Built multiple full-stack projects using MERN stack."
    },
    {
      degree: "PUC (12th Grade)",
      college: "KLE's GH PU College, Haveri",
      year: "2020 – 2022",
      desc: "Studied Computer Science and Mathematics. Developed interest in programming and problem solving."
    },
    {
      degree: "SSLC (10th Grade)",
      college: "St Anne's High School, Haveri",
      year: "2019 – 2020",
      desc: "Built foundation in logical thinking and analytical skills."
    }
  ];

  return (
    <section id="education" className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-6">
      
      <h2 className="text-4xl font-bold text-center mb-16">
       <span className="text-blue-400"> My Education</span>
      </h2>

      <div className="max-w-4xl mx-auto relative border-l-2 border-blue-500">

        {educationData.map((edu, index) => (
          <div key={index} className="mb-12 ml-6">

            {/* Circle */}
            <span className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2.5 border border-white"></span>

            <div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">

              <h3 className="text-xl font-semibold text-blue-400">
                {edu.degree}
              </h3>

              <p className="text-gray-300">{edu.college}</p>
              <p className="text-sm text-gray-400 mb-3">{edu.year}</p>

              <p className="text-gray-300">{edu.desc}</p>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Education;
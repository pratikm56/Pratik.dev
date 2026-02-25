import { useState } from "react";
import axios from "axios";

export default function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/Contact", form);
    alert("Message sent!");
    setForm({name:"",email:"",message:""});
  };

  return (
    <section id="contact" className="py-28 bg-black text-white px-6 my-20">

      <h2 className="text-4xl font-bold text-center mb-14">Contact Me</h2>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-10 space-y-6">

        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-4 rounded-lg bg-black/50 border border-white/20 focus:outline-none focus:border-blue-400"
        />

        <input
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-4 rounded-lg bg-black/50 border border-white/20 focus:outline-none focus:border-blue-400"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="w-full p-4 rounded-lg h-40 bg-black/50 border border-white/20 focus:outline-none focus:border-blue-400"
        />

        <button className="w-full bg-blue-500 hover:bg-blue-600 transition py-4 rounded-lg font-semibold text-lg">
          Send Message
        </button>

      </form>
    </section>
  );
}
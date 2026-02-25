import React, { useState } from "react";
import axios from "axios";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://pratik-dev.onrender.com/contact",
        formData
      );

      if (res.data.success) {
        setStatus("Message sent successfully ✅");
        setFormData({ name: "", email: "", message: "" });
      }

    } catch (err) {
      setStatus("Server waking up... try again in 20 seconds ⏳");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#020617] text-white px-4">

      <form
        onSubmit={onSubmit}
        className="bg-[#0f172a] p-8 rounded-2xl shadow-xl w-full max-w-xl"
      >

        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">
          Contact Me
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-[#1e293b]"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-[#1e293b]"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          className="w-full mb-4 p-3 rounded-lg bg-[#1e293b]"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-lg font-semibold"
        >
          Send Message
        </button>

        {status && (
          <p className="text-green-400 mt-4 text-center">{status}</p>
        )}

      </form>
    </div>
  );
}

export default Contact;
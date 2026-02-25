import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // submit form
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/contact`, formData);

      setStatus("Message sent successfully ✅");

      // clear form
      setFormData({
        name: "",
        email: "",
        message: ""
      });

    } catch (error) {
      console.error(error);
      setStatus("Failed to send message ❌ (Server may be waking up)");
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-10">
          Contact Me
        </h2>

        <form
          onSubmit={onSubmit}
          className="bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6"
        >

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Message */}
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 p-3 rounded-lg font-semibold"
          >
            Send Message
          </button>

          {/* Status Message */}
          {status && (
            <p className="text-center mt-4 text-lg">{status}</p>
          )}

        </form>
      </div>
    </section>
  );
};

export default Contact;
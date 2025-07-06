import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa";
import useSendMessage from "../../context/useSendMessage.js";
import axios from "axios";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  // Language selection state
  const [enableTranslation, setEnableTranslation] = useState(false);
  const [language, setLanguage] = useState("en");

  // 5 language options
  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "es", label: "Spanish" },
    { code: "fr", label: "French" },
    { code: "de", label: "German" },
  ];

  // Update preferred language in backend
  const handleLanguageChange = async (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    if (enableTranslation) {
      try {
        await axios.post("/api/user/language", { language: lang });
      } catch (err) {
        // Optionally show error
      }
    }
  };

  const handleCheckbox = async () => {
    setEnableTranslation((prev) => !prev);
    if (!enableTranslation) {
      // If enabling, update backend with current language
      try {
        await axios.post("/api/user/language", { language });
      } catch (err) {}
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessages({
      message,
      language: enableTranslation ? language : "en",
    });
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center px-4 py-3 bg-[#202c33]">
        {/* Language selector with checkbox */}
        <div className="flex items-center mr-3">
          <input
            type="checkbox"
            id="enable-translation"
            checked={enableTranslation}
            onChange={handleCheckbox}
            className="mr-1 accent-[#25d366]"
          />
          <label htmlFor="enable-translation" className="mr-2 cursor-pointer">
            <FaGlobe className="inline text-lg" title="Enable translation" />
          </label>
          <select
            value={language}
            onChange={handleLanguageChange}
            disabled={!enableTranslation}
            className={`rounded px-2 py-1 text-sm bg-white text-black border border-gray-300 focus:outline-none ${
              !enableTranslation ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 rounded-full px-4 py-2 bg-white text-black outline-none"
        />
        <button
          className="ml-2 bg-[#25d366] rounded-full p-2"
          disabled={loading}
        >
          <IoSend className="text-xl text-white" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;

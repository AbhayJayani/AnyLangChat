import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center px-4 py-3 bg-[#202c33]">
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 rounded-full px-4 py-2 bg-white text-black outline-none"
        />
        <button className="ml-2 bg-[#25d366] rounded-full p-2">
          <IoSend className="text-xl text-white" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;

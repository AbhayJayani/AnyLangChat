import React from "react";
import { BiCheck, BiCheckDouble } from "react-icons/bi";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  let TickIcon = null;
  if (itsMe) {
    if (message.status === "read") {
      TickIcon = <BiCheckDouble className="inline ml-1 text-[#3330ee]" />;
    } else if (message.status === "delivered") {
      TickIcon = <BiCheckDouble className="inline ml-1 text-[#f4f3fa]" />;
    } else {
      TickIcon = <BiCheck className="inline ml-1 text-[#f4f4f5]" />;
    }
  }

  const chatAlign = itsMe ? "justify-end" : "justify-start";
  const bubbleColor = itsMe ? "bg-[#25d366] text-black" : "bg-white text-black";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${chatAlign} mb-1`}>
      <div className={`rounded-xl px-3 py-2 max-w-[70%] ${bubbleColor} shadow`}>
        <div>{message.message}</div>
        <div className="text-xs text-right text-gray-500 mt-1 flex items-center justify-end gap-1">
          {formattedTime}
          {TickIcon}
        </div>
      </div>
    </div>
  );
}

export default Message;

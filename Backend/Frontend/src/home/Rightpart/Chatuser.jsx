import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { FaUserCircle } from "react-icons/fa";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className="flex items-center gap-4 px-6 py-4 bg-[#075e54] h-[60px]">
      <div className="avatar online">
        <FaUserCircle className="text-3xl text-white" />
      </div>
      <div>
        <h1 className="text-lg font-semibold text-white">
          {selectedConversation.fullname}
        </h1>
        <span className="text-xs text-[#d1fae5]">
          {getOnlineUsersStatus(selectedConversation._id)}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;

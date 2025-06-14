import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { FaUserCircle } from "react-icons/fa";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`cursor-pointer px-4 py-3 flex items-center gap-4 hover:bg-[#2a3942] transition ${
        isSelected ? "bg-[#2a3942]" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <FaUserCircle className="text-3xl text-[#8696a0]" />
      </div>
      <div>
        <h1 className="font-semibold">{user.fullname}</h1>
        <span className="text-xs text-[#8696a0]">{user.email}</span>
      </div>
    </div>
  );
}

export default User;

import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../statemanage/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="w-[70vw] flex flex-col bg-[#111b21] border-l border-white/20 h-full">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <Chatuser />
          <div
            className="flex-1 overflow-y-auto px-3 py-4"
            style={{ background: "#222d34" }}
          >
            <Messages />
          </div>
          <Typesend />
        </>
      )}
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="text-center text-white">
        Welcome{" "}
        <span className="font-semibold text-xl text-[#25d366]">
          {authUser.user.fullname}
        </span>
        <br />
        No chat selected, please start conversation by selecting a contact.
      </h1>
    </div>
  );
};

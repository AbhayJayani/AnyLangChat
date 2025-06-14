import React from "react";
import Search from "./Search";
import Users from "./Users";

function Left() {
  return (
    <div className="w-[30vw] min-w-[250px] max-w-[400px] bg-[#202c33] text-white flex flex-col border-r border-white/20 h-full">
      <div className="px-4 py-3 bg-[#075e54] flex items-center gap-3">
        <img
          src="/icon-image.jpg"
          alt="AnyLangChat Logo"
          className="w-10 h-10 rounded-lg object-cover border border-white/30"
        />
        <h1 className="font-bold text-2xl tracking-wide">AnyLangChat</h1>
      </div>
      <Search />
      <div className="flex-1 overflow-y-auto">
        <Users />
      </div>
    </div>
  );
}

export default Left;

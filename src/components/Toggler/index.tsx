import React, { useState } from "react";

const Toggler = ({
  mode,
  setMode,
}: {
  mode: string;
  setMode: (arg: string) => void;
}) => {
  const [isToggled, setIsToggled] = useState<boolean>(mode === "user");

  const handleToggle = () => {
    const newMode = mode === "admin" ? "user" : "admin";
    setMode(newMode);
    setIsToggled(!isToggled);
  };

  return (
    <div className="flex justify-end gap-4 items-center">
      <p>admin</p>
      <div
        className={`w-8 h-3 flex items-center rounded-full cursor-pointer transition-colors ${
          isToggled ? "bg-lime-200" : "bg-gray-500"
        }`}
        onClick={handleToggle}
      >
        <div
          className={`${
            isToggled ? "bg-lime-500" : "bg-white"
          } w-4 h-4 rounded-full shadow-md transform transition-transform ${
            isToggled ? "translate-x-4" : ""
          }`}
        />
      </div>
      <p>user</p>
    </div>
  );
};

export default Toggler;

import React from "react";
import Logout from "../../images/Logout";
import Toggler from "../Toggler";

const Navbar = ({
  mode,
  setMode,
}: {
  mode: string;
  setMode: (arg: string) => void;
}) => {
  return (
    <div className="flex justify-end items-center gap-8">
      <Toggler mode={mode} setMode={setMode} />
      <Logout />
    </div>
  );
};

export default Navbar;

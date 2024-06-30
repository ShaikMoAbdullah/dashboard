import React from "react";
function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-green-400 border-t-transparent"></div>
    </div>
  );
}
export default Loader;

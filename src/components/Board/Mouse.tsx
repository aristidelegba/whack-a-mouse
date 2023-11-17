import React from "react";

type TMouseProps={
  show:boolean
}
function Mouse({show}:TMouseProps) {
  return (
    <>
      {show && <div className="h-[20px] w-[20px] rounded-full bg-black"></div>}
    </>
  );
}

export default Mouse;

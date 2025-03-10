import React, { ReactNode } from "react";

interface IMaxWidth {
  className?: string;
  children: ReactNode;
}

function Maxwidth({ children, className }: IMaxWidth) {
  return (
    <div
      className={`w-full mx-auto min-h-screen  md:max-w-screen-xl  ${className}`}
    >
      {children}
    </div>
  );
}

export default Maxwidth;

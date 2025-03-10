"use client"
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import {motion} from "motion/react"

interface IHeading {
  className?: string;
  children: ReactNode;
  badgeText?: string;
}

function Heading({ className, badgeText, children, ...props }: IHeading) {
  return (
    <div className="flex flex-col items-center text-center gap-1">
      <h3 className="text-sm md:text-lg font-normal text-gray-600 ">
        {badgeText}
      </h3>
          <motion.h1
              initial={{
                  opacity: 0,
                  filter: "blur(10px)",
               
              }}
              whileInView={{
                  opacity: 1,
                  filter: "blur(0px)",
                
              }}
              transition={{
                  duration: 0.5,
                ease: "easeInOut",
                  delay:0.6
              }}
        className={cn(
          "text-2xl md:text-5xl w-full text-orange-500 font-semibold tracking-tight  ",
          className
        )}
        {...props}
      >
        {children}
      </motion.h1>
    </div>
  );
}

export default Heading;

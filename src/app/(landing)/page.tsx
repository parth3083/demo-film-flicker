"use client"
import Heading from "@/components/Heading";
import Maxwidth from "@/components/Maxwidth";
import ShinyButton from "@/components/ShinyButton";
import { Check } from "lucide-react";
import {motion} from "motion/react"

function page() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        filter: "blur(10px)",
      scale:0.5
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        scale:1,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      className="relative font-sat flex flex-col items-center justify-evenly w-full h-screen">
      <Maxwidth className="flex  items-center gap-16 justify-center  flex-col">
        <Heading badgeText="Get best movie picks without the hassle with,">
          AI-powered Movie Recommendation
        </Heading>
        <p className="text-sm md:text-lg w-full  text-center lg:px-56">
          Get AI-powered movie rcommendations effortlessly with{" "}
          <span className="font-semibold text-orange-500">
            real-time suggestions
          </span>
          , <span className="font-semibold text-orange-500">trailers</span>, and{" "}
          <span className="font-semibold text-orange-500">details</span>{" "}
          delivered instantly to your screen.
        </p>
        <ul className="    flex flex-col items-start gap-1">
          {[
            "AI-powered movie picks tailored for you.",
            "Watch trailers and explore movie descriptions in real-time.",
            "Dynamic, real-time results—no database needed.",
          ].map((items, index) => (
            <li
              key={index}
              className="flex items-center gap-2  text-sm md:text-xl"
            >
              <Check className="size-5 text-orange-500 font-semibold text-xl" />
              {items}
            </li>
          ))}
        </ul>
        <div className="w-full max-w-80">
          <ShinyButton className="capitalize relative h-14 w-full  shadow-xl transition-shadow duration-300 hover:shadow-xl text-2xl"
          
            href="/recommend">
            Get recommendations

          </ShinyButton>
        </div>
      </Maxwidth>
    </motion.section>
  );
}

export default page;

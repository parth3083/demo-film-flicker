import React from "react";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";

interface ICard {
  title: string;
  image: string;
}

function Cards({ title, image }: ICard) {
  return (
    <Card className="group border-2 border-gray-300 shadow-xl w-60 lg:w-60 md:w-full h-96 overflow-hidden hover:scale-105 transition-all ease-linear duration-200 cursor-pointer">
      <CardHeader className=" h-[80%] overflow-hidden p-3 ">
        <Image
          src={image}
          className="w-full h-full object-cover rounded-md"
          alt="alternate text for the image"
          width={300}
          height={168}
        />
      </CardHeader>

      <CardFooter className="h-[20%] py-1 ">
        <p className="text-xl lg:text-xl md:text-2xl font-semibold group-hover:text-orange-500">
          {title}
        </p>
      </CardFooter>
    </Card>
  );
}

export default Cards;

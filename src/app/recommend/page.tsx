"use client";
import Cards from "@/components/Cards";
import Maxwidth from "@/components/Maxwidth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

function Page() {
  const [movieName, setMovieName] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleMovieName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieName(e.target.value);
  };

  async function fetchData(movieName: string) {
    try {
      setLoading(true);
      const response = await axios.post("/api/movie-recommended", {
        movieName,
      });
      setMovieData(response.data.recommendedMovie || []);
    } catch (error) {
      console.error("Error fetching movie recommendations:", error);
      setMovieData([]);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = () => {
    if (!movieName.trim()) return;
    setShow(true);
    fetchData(movieName);
    setMovieName("");
  };
  useEffect(() => {
    setLoading(false);
  }, [movieData]);
  return (
    <section className="relative font-sat flex flex-col items-center justify-evenly w-full min-h-screen">
      <Maxwidth className="py-10 flex flex-col items-center justify-center gap-12">
        {/* Input Section  */}
        <div className="w-full px-5 md:px-20 lg:px-72 flex items-center space-x-2">
          <Input
            value={movieName}
            onChange={handleMovieName}
            type="text"
            className="outline-none text-md md:text-xl"
            placeholder="Enter the movie"
          />
          <Button
            onClick={handleSearch}
            className="text-md md:text-lg bg-orange-500 hover:bg-orange-600"
            type="button"
          >
            Search
          </Button>
        </div>

        {/* Output Section  */}
        {show && (
          <section className="flex-1 h-[90%] w-[80%] lg:w-full flex flex-col items-start">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src="/loader.gif"
                  alt="loader"
                  width={80}
                  height={80}
                  className="object-contain size-20"
                />
              </div>
            ) : (
              <>
                <div className="upper w-full border-b border-orange-300">
                  <h1 className="text-2xl md:text-5xl w-full text-orange-500 font-medium tracking-tight text-left mb-3">
                    Recommendations
                  </h1>
                </div>
                {/* Card Container */}
                <div className="lower w-full grow p-2 pt-7 flex lg:flex-row flex-col items-center lg:items-start lg:gap-3 gap-5 flex-wrap">
                  {movieData.length > 0 ? (
                    movieData.map((item, index) => (
                      <Cards
                        key={index}
                        title={item.title}
                        image={item.poster}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500">No recommendations found.</p>
                  )}
                </div>
              </>
            )}
          </section>
        )}
      </Maxwidth>
    </section>
  );
}

export default Page;

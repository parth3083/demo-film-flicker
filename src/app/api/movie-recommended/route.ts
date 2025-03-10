import { spawn } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import { fetchMovies } from "@/helpers/posterFetch";

type Movie = {
  title: string;
  id: string | null;
  poster: string | null;
};

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const { movieName } = await request.json();

    if (!movieName) {
      return NextResponse.json(
        { error: "Movie name is required" },
        { status: 500 }
      );
    }

    return new Promise<Response>((resolve, reject) => {
      let recommendedMovie: Movie[] = [];

      const pythonProcess = spawn("python", [
        "./src/helpers/recommend.py",
        movieName,
      ]);

      pythonProcess.stdout.on("data", async (data: Buffer) => {
        try {
          const movies: string[] = data.toString().trim().split("\n");

          recommendedMovie = await Promise.all(
            movies.map(async (movie: string) => {
              const [title, id] = movie.split("|").map((item) => item.trim());
              const poster = await fetchMovies(title);
              return { title, id, poster };
            })
          );

          resolve(NextResponse.json({ recommendedMovie }, { status: 200 }));
        } catch (err) {
          console.error("Error processing movie data:", err);
          reject(
            NextResponse.json(
              { error: "Failed to fetch movie data" },
              { status: 500 }
            )
          );
        }
      });

      pythonProcess.stderr.on("data", (data: Buffer) => {
        console.error(`Python Error: ${data}`);
        reject(
          NextResponse.json({ error: "Python script failed" }, { status: 401 })
        );
      });

      pythonProcess.on("close", (code: number) => {
        if (code !== 0) {
          console.error(`Python script exited with code ${code}`);
          reject(
            NextResponse.json(
              { error: "Python script failed" },
              { status: 401 }
            )
          );
        }
      });
    });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 }
    );
  }
}

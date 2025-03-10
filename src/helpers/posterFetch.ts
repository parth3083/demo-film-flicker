import axios from "axios";

export async function fetchMovies(movieTitle: string): Promise<string | null> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_IMAGE_API! || "";
    const response = await axios.get("https://serpapi.com/search", {
      params: {
        engine: "google_images",
        q: `${movieTitle} movie poster`,
        api_key: apiKey,
      },
    });
    const images = response.data.images_results;
    if (!images || images.length === 0) return null;
    return images[0].original;
  } catch (error) {
    console.log(error);
    return null;
  }
}

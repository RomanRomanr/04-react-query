import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesRes {
  results: Movie[],
  page?: number;
  total_pages: number;
}
const token = import.meta.env.VITE_TMDB_TOKEN;

const fetchMovies = async (query: string, page: number) => {
  const { data } = await axios.get<FetchMoviesRes>(
    "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US",
    {
      params: { query, page },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export default fetchMovies;

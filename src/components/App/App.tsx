import { useState } from "react";
import css from "./App.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectMovie, setSelectMovie] = useState<Movie | null>(null);
  const close = () => setSelectMovie(null);
  const search = async (query: string) => {
    setLoader(true);
    setMovies([]);
    setError(null);
    try {
      const res = await fetchMovies({ query });
      if (res.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }
      setMovies(res);
    } catch {
      setError("There was an error, please try again...");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={search} />
      {loader && <Loader />}

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        !loader &&
        movies.length > 0 && (
          <MovieGrid
            movies={movies}
            onSelect={(movie) => setSelectMovie(movie)}
          />
        )
      )}
      {selectMovie && <MovieModal movie={selectMovie} onClose={close} />}

      <Toaster position="top-center" />
    </div>
  );
}

export default App;

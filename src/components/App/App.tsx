import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Pagination from "../Paginate/ReactPagination";

import type { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const results = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  useEffect(() => {
    if (!isLoading && results.length === 0 && query) {
      toast.error("No movies found for your request.");
    }
  }, [isLoading, results.length, query]);

  return (
    <div className={css.app}>
      <SearchBar
        onSubmit={(value) => {
          setQuery(value);
          setPage(1);
        }}
      />

      {isLoading && <Loader />}

      {isError && <ErrorMessage message="Something went wrong" />}

      {results.length > 0 && (
        <MovieGrid movies={results} onSelect={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {isSuccess && totalPages > 1 && (
        <Pagination
          forcePage={page - 1}
          pageCount={totalPages}
          onPageChange={setPage}
        />
      )}

      <Toaster position="top-center" />
    </div>
  );
}

export default App;

import { createPortal } from "react-dom";
import css from "./MovieModal.module.css";
import { useEffect } from "react";
import type { Movie } from "../../types/movie";
interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}
const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", escape);
    };
  }, [onClose]);
  const modalRoot = document.getElementById("modal-root") as HTMLDivElement;
  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/1280x720?text=No+Image"
          }
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};
export default MovieModal;

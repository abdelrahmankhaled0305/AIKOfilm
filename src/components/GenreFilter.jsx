function GenreFilter({ genres = [], selectedGenre, onSelectGenre }) {
  return (
    <div className="genre-filter" role="group" aria-label="Filter movies by genre">
      <button
        type="button"
        onClick={() => onSelectGenre(null)}
        className={`genre-pill ${selectedGenre === null ? 'active' : ''}`}
      >
        All
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          type="button"
          onClick={() => onSelectGenre(genre.id)}
          className={`genre-pill ${selectedGenre === genre.id ? 'active' : ''}`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  )
}

export default GenreFilter
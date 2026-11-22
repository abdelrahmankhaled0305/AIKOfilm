function SearchBar({
  value,
  onChange,
  onClear,
  onSubmit,
  placeholder = 'Search movies...',
  className = '',
}) {
  function handleFormSubmit(e) {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(value)
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className={`search-bar-wrapper ${className}`}>
<input
  id="movie-search-input"
  name="search"
  type="text"
  value={value}
  onChange={(e) => onChange(e.target.value)}
  placeholder={placeholder}
  className="search-input"
  aria-label={placeholder}
/>

      {value && (
        <button
          type="button"
          onClick={onClear}
          className="clear-search-btn"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </form>
  )
}

export default SearchBar
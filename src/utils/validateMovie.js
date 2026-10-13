export function validateMovie(movie) {
  const errors = {}
  const maxYear = new Date().getFullYear() + 5

  if (!movie.title) {
    errors.title = 'Title is required.'
  } else if (movie.title.length > 100) {
    errors.title = 'Title must be at most 100 characters.'
  }
  const year = movie.year
  if (!Number.isInteger(year) || year < 1888 || year > maxYear) {
    errors.year = `Year must be between 1888 and ${maxYear}.`
  }
  if (!movie.genre) {
    errors.genre = 'Please choose a genre.'
  }
  return errors
}

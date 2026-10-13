import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMovieStore } from './movies.js'

describe('movie store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  afterEach(() => vi.unstubAllGlobals())

  it('adds a movie with a new id', () => {
    const store = useMovieStore()
    store.addMovie({ title: 'Dune', year: 2021, genre: 'Sci-Fi' })
    expect(store.movies).toHaveLength(1)
    expect(store.movies[0].id).toBeDefined()
  })

  it('counts movies on the watchlist', () => {
    const store = useMovieStore()
    store.movies = [
      { id: 1, title: 'A', inWatchlist: true },
      { id: 2, title: 'B', inWatchlist: false },
    ]
    store.toggleWatchlist(2)
    expect(store.watchlistCount).toBe(2)
  })

  it('shows an error when the server fails', async () => {
    const failing = vi.fn().mockResolvedValue({ ok: false, status: 500 })
    vi.stubGlobal('fetch', failing)
    const store = useMovieStore()
    await store.loadMovies()
    expect(store.error).toBe('HTTP 500')
    expect(store.loading).toBe(false)
  })
})

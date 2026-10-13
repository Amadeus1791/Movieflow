import { describe, it, expect } from 'vitest'
import { validateMovie } from './validateMovie.js'

const validMovie = { title: 'Arrival', year: 2016, genre: 'Sci-Fi' }

describe('validateMovie', () => {
  it('accepts a complete movie', () => {
    expect(validateMovie(validMovie)).toEqual({})
  })

  it('requires a title', () => {
    const errors = validateMovie({ ...validMovie, title: '' })
    expect(errors.title).toBe('Title is required.')
  })

  it('rejects years before 1888', () => {
    const errors = validateMovie({ ...validMovie, year: 1850 })
    expect(errors).toHaveProperty('year')
  })
})

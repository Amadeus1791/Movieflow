import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import MovieCard from './MovieCard.vue'

const movie = {
  id: 7,
  title: 'Arrival',
  year: 2016,
  genre: 'Sci-Fi',
  rating: 7.9,
  inWatchlist: false,
}

function mountCard() {
  return mount(MovieCard, {
    props: { movie },
    global: { stubs: { RouterLink: RouterLinkStub } },
  })
}

// Knopf ueber seinen sichtbaren Text finden, nicht ueber die Position
function findButton(wrapper, text) {
  const buttons = wrapper.findAll('button')
  return buttons.find((button) => button.text() === text)
}

describe('MovieCard', () => {
  it('shows the movie title', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('Arrival')
  })

  it('emits toggleWatchlist with the movie id', async () => {
    const wrapper = mountCard()
    const button = findButton(wrapper, 'Add to watchlist')
    await button.trigger('click')
    expect(wrapper.emitted('toggleWatchlist')).toEqual([[7]])
  })

  it('emits remove with the movie id', async () => {
    const wrapper = mountCard()
    const button = findButton(wrapper, 'Remove')
    await button.trigger('click')
    expect(wrapper.emitted('remove')).toEqual([[7]])
  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieForm from './MovieForm.vue'

describe('MovieForm', () => {
  it('shows an error instead of saving an empty form', async () => {
    const wrapper = mount(MovieForm)
    await wrapper.get('form').trigger('submit')
    expect(wrapper.text()).toContain('Title is required.')
    expect(wrapper.emitted('save')).toBeUndefined()
  })
})

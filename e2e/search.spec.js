import { test, expect } from '@playwright/test'

test('search filters the movie list', async ({ page }) => {
  await page.goto('/movies')
  await page.getByRole('textbox').fill('dune')

  await expect(page.getByRole('link', { name: 'Dune' })).toBeVisible()
  const inception = page.getByRole('link', { name: 'Inception' })
  await expect(inception).toHaveCount(0)
})

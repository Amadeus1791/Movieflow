import { test, expect } from '@playwright/test'

test('reset filters brings the movies back', async ({ page }) => {
  await page.goto('/movies')
  const search = page.getByRole('textbox')
  await search.fill('xyz')
  const empty = page.getByRole('heading', { name: 'No matching movies' })
  await expect(empty).toBeVisible()

  await page.getByRole('button', { name: 'Reset filters' }).click()
  await expect(page.getByRole('link', { name: 'Dune' })).toBeVisible()
  await expect(search).toHaveValue('')
})

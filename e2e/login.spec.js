import { test, expect } from '@playwright/test'

test('adding a movie needs a login', async ({ page }) => {
  await page.goto('/movies/new')
  await expect(page).toHaveURL(/\/login/)

  await page.getByRole('button', { name: 'Log in as demo user' }).click()
  const heading = page.getByRole('heading', { name: 'Add movie' })
  await expect(heading).toBeVisible()

  await page.getByRole('button', { name: 'Log out' }).click()
  await expect(page).toHaveURL('/')
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible()
})

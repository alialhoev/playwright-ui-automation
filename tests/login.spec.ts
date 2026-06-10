import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login success', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('login invalid user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open('https://www.saucedemo.com/');
  await loginPage.login('error', 'error');

  await expect(loginPage.getErrorMessage()).toBeVisible();
});

test('login locked user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open('https://www.saucedemo.com/');
  await loginPage.login('locked_out_user', 'secret_sauce');

  await expect(loginPage.getErrorMessage()).toBeVisible();
});

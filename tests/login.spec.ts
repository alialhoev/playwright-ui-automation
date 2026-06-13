import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../utils/testData';

test('login success', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(users.validUser.username, users.validUser.password);

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('login locked user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(users.lockedUser.username, users.lockedUser.password);

  await expect(loginPage.getError()).toBeVisible();
});

test('login invalid user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(users.invalidUser.username, users.invalidUser.password);

  await expect(loginPage.getError()).toBeVisible();
});

import { test } from '@playwright/test';
import { BASE_URL } from '../config/constants.js';
import { LoginPage } from '../pages/LoginPage.js';

//TC_03, TC_04 (Test Case IDs of Splash Screen)

test('Login', async ({ page }) => {

  await page.goto(BASE_URL);

  const loginPage = new LoginPage(page);

  // await loginPage.verifyPageTitle();  //This is covered in spalsh screen test
  await loginPage.login();

});

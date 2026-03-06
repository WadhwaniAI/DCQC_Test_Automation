import { test } from '@playwright/test';
import { BASE_URL } from '../config/constants.js';
import { LoginScreenPage } from '../pages/LoginScreenPage.js';

//TC_01, TC_02, TC_07, TC_12, TC_22, TC_23, TC_25, TC_26,Tc_31,TC_32, TC_33, TC_37 (Test Case IDs for Login Screen)
test('Verify Login Screen', async ({ page }) => {

    await page.goto(BASE_URL);

    const loginScreenPage = new LoginScreenPage(page);

    await loginScreenPage.verifyLoginScreen();

    await loginScreenPage.verfiyOtpScreen();

});
import { test } from '@playwright/test';
import { BASE_URL } from '../config/constants.js';
import { LoginPage } from '../pages/LoginPage.js';
import { login } from '../utils/login.js';
import { JobSelectionPage } from '../pages/JobSelectionPage.js';

//TC_14 (Test Case ID for Logout Feature of Job Selection Screen)
test('Verify Logout Feature', async ({ page }) => {
    await page.goto(BASE_URL);

    await login(page);

    const jobSelectionPage = new JobSelectionPage(page);

    await jobSelectionPage.verifyLogoutFeature();

});
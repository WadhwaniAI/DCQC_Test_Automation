import { test } from '@playwright/test';
import { BASE_URL } from '../config/constants.js';
import { JobSelectionPage } from '../pages/JobSelectionPage.js';
import { login } from '../utils/login.js';

//TC_01, TC_06, TC_07, TC_08, TC_09, TC_10, TC_11, TC_15, TC_27, TC_29 (Test Case IDs for Project/Job Selection Screen)
test('Verify Job Selection Screen', async ({ page }) => {

    await page.goto(BASE_URL);
    await login(page);

    const jobSelectionPage = new JobSelectionPage(page);

    await jobSelectionPage.verifyJobSelectionScreen();

    await jobSelectionPage.verifyHamBurgerMenu();

    await jobSelectionPage.verifySelectedJobData();

}); 
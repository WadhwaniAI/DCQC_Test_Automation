import { test, expect } from '@playwright/test';
import { BASE_URL } from '../config/constants.js';
import { SplashScreenPage } from '../pages/SplashScreenPage.js';


//TC_01, TC_02, TC_05, TC_06 (Test Case IDs for Splash Screen)
test('Verify Splash Screen', async ({ page }) => {

    const startTime = Date.now();
    await page.goto(BASE_URL);
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThanOrEqual(12000);

    const splashScreenPage = new SplashScreenPage(page);

    await splashScreenPage.verifySplashScreen();

});

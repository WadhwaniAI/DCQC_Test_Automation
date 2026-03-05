import { expect } from '@playwright/test';

export class SplashScreenPage {

    constructor(page) {
        this.page = page;

        // Locators
        this.pageHeading = page.locator("h1[class='OnBoardingScreen-module__oS-1Ra__onboarding-title']");
        this.subHeading = page.getByText('Collect Data And Create AI Systems');
        this.getStartedButton = page.getByRole('button', { name: 'Get Started' });
        this.footerText = page.locator("p[class='MuiTypography-root MuiTypography-body1 Footer-module__7ULjua__footer-text mui-ds36i']");

    }

    async verifySplashScreen() {

        await expect(this.page).toHaveTitle('Data Collection & Quality Check');
        await expect(this.pageHeading).toBeVisible();
        await expect(this.subHeading).toBeVisible();
        await expect(this.getStartedButton).toBeVisible();
        await expect(this.getStartedButton).toBeEnabled();
        await expect(this.footerText).toBeVisible();


    }
}
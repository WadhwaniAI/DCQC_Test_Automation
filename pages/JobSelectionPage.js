import { expect } from '@playwright/test';
import { DASHBOARD_URL } from '../config/constants.js';

export class JobSelectionPage {

    constructor(page) {
        this.page = page;

        // Locators
        this.welcomeText = page.getByText('Welcome');
        this.usernameText = page.locator("span[class='jobs-module__RK_T8a__userName']");
        this.hamBurgerMenu = page.locator("button[class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium jobs-module__RK_T8a__hamburgerButton mui-mfslm7']");
        this.jobSelectionHeader = page.locator("div[class='jobs-module__RK_T8a__sectionHeader MuiBox-root mui-0']");
        this.jobSelectionStartButton = page.locator("//p[text()='RJ_Eng_Para_Teachers']/following::button[text()='Start'][1]");
        this.selectedJobText = page.getByText('RJ_Eng_Para_Teachers');
        this.collectingDataText = page.getByText('You are collecting data for:');
        this.editJobButton = page.locator("button[class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall ChooseActionScreen-module__CR9w4W__edit-icon-button mui-xz9haa']");
        this.collectDataCard = page.locator("div[class='ChooseActionScreen-module__CR9w4W__choose-action-cards MuiBox-root mui-0']");
        this.collectDataButton = page.getByText('Collect Data', { exact: true });
        this.username = page.locator("p[class='MuiTypography-root MuiTypography-body1 HamburgerMenu-module__yOszsG__menu-user-name mui-5lr4o']");
        this.phoneNumber = page.locator("p[class='MuiTypography-root MuiTypography-body1 HamburgerMenu-module__yOszsG__menu-phone-number mui-5lr4o']");
        this.privacyPolicyText = page.getByText("Privacy Policy");
        this.logoutButton = page.locator("p[class='MuiTypography-root MuiTypography-body1 HamburgerMenu-module__yOszsG__logout-button-text mui-5lr4o']");
        this.userAvatar = page.locator("div[class='HamburgerMenu-module__yOszsG__menu-avatar MuiBox-root mui-0']");
        this.hamBurgerCloseButton = page.locator("button[class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium HamburgerMenu-module__yOszsG__close-button mui-mfslm7']");
        this.footerText1 = page.getByText('Wadhwani AI');
        this.footerText2 = page.getByText(' product');
    }

    async verifyJobSelectionScreen() {

        await expect(this.welcomeText).toBeVisible();
        await expect(this.usernameText).toBeVisible();
        await expect(this.hamBurgerMenu).toBeVisible();
        await expect(this.jobSelectionHeader).toBeVisible();
    }

    async verifyHamBurgerMenu() {

        await expect(this.hamBurgerMenu).toBeVisible();
        await expect(this.hamBurgerMenu).toBeEnabled();
        await this.hamBurgerMenu.click();

        await expect(this.userAvatar).toBeVisible();
        await expect(this.username).toBeVisible();
        await expect(this.phoneNumber).toBeVisible();
        await expect(this.privacyPolicyText).toBeVisible();

        //close hamburger menu verification
        await expect(this.hamBurgerCloseButton).toBeVisible();
        await this.hamBurgerCloseButton.click();

    }

    async verifyLogoutFeature() {

        await expect(this.hamBurgerMenu).toBeVisible();
        await this.hamBurgerMenu.click();

        await expect(this.logoutButton).toBeVisible();
        await expect(this.logoutButton).toBeEnabled();
        await this.logoutButton.click();

    }

    async verifySelectedJobData() {

        await this.page.waitForTimeout(4000);
        await expect(this.jobSelectionStartButton).toBeVisible({ timeout: 10000 });
        await expect(this.jobSelectionStartButton).toBeEnabled({ timeout: 10000 });
        await this.jobSelectionStartButton.click();

        await expect(this.selectedJobText).toBeVisible();
        await expect(this.collectingDataText).toBeVisible();
        await expect(this.editJobButton).toBeVisible();
        await expect(this.editJobButton).toBeEnabled();
        await expect(this.collectDataCard).toBeVisible();
        await expect(this.footerText1).toBeVisible();
        await expect(this.footerText2).toBeVisible();

        await expect(this.collectDataButton).toBeVisible();
        await expect(this.collectDataButton).toBeEnabled();
        // await this.collectDataButton.click();
        await this.editJobButton.click();
        await this.page.waitForTimeout(1000);
        await expect(this.page).toHaveURL(DASHBOARD_URL);

    }

}
import { expect } from '@playwright/test';
import { LOGIN } from '../config/constants.js';
import { DASHBOARD_URL } from '../config/constants.js';

export class LoginScreenPage {

    constructor(page) {
        this.page = page;

        // Locators
        this.loginScreenHeading = page.locator("h4[class='MuiTypography-root MuiTypography-h4 ScreenHeader-module__AIcTnG__title mui-i27t96']");
        this.getStartedButton = page.getByRole('button', { name: 'Get Started' });
        this.mobileNumberText = page.getByText('Enter mobile number');
        this.mobileNumberInput = page.locator("input[aria-label='Phone number']");
        this.sendOtpButton = page.getByRole('button', { name: 'Send OTP' });
        this.otpInput = page.locator("div[class='OTPVerificationScreen-module__SYjNLa__otp-verification-otp-container MuiBox-root mui-0']");
        this.otpDigitInputs = this.otpInput.locator('input');
        this.enterOtpText = page.getByText('Enter 6 digit OTP');
        this.phoneNumberText = page.locator("span[class='OTPVerificationScreen-module__SYjNLa__otp-verification-phone-display-number']");
        this.resendOtpButton = page.getByRole('button', { name: 'Resend OTP' });
        this.verifyOtpButton = page.getByRole('button', { name: 'Verify OTP' });
    
    }

    async verifyLoginScreen() {

        const startTime = Date.now();
        await this.getStartedButton.click();
        
        await expect(this.loginScreenHeading).toBeVisible();
        const loadTime = Date.now() - startTime;
        expect(loadTime).toBeLessThanOrEqual(3000);

        await expect(this.mobileNumberText).toBeVisible();
        await expect(this.mobileNumberInput).toBeVisible();
        await expect(this.sendOtpButton).toBeVisible();
        await expect(this.sendOtpButton).toBeDisabled();
        await this.mobileNumberInput.fill(LOGIN.phone);
        await expect(this.sendOtpButton).toBeEnabled();
        await this.sendOtpButton.click();

    }

    async verfiyOtpScreen(otp = LOGIN.otp) {

        await expect(this.otpInput).toBeVisible();
        await expect(this.enterOtpText).toBeVisible();
        await expect(this.phoneNumberText).toBeVisible();
        await expect(this.resendOtpButton).toBeVisible();
        await expect(this.resendOtpButton).toBeDisabled();
        await expect(this.verifyOtpButton).toBeVisible();
        await expect(this.verifyOtpButton).toBeDisabled();

        const digits = otp.split('');
        for (let i = 0; i < 6; i++) {
            await this.otpDigitInputs.nth(i).fill(digits[i] ?? '');
        }

        await expect(this.verifyOtpButton).toBeEnabled();
        await this.verifyOtpButton.click();

        await expect(this.page).toHaveURL(DASHBOARD_URL);

    }

}
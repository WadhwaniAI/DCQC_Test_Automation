import { expect } from '@playwright/test';
import { LOGIN } from '../config/constants.js';

export class LoginPage {

    constructor(page) {
        this.page = page;

        // Locators
        this.getStartedButton = page.getByRole('button', { name: 'Get Started' });
        this.phoneInput = page.getByRole('textbox', { name: /phone number/i });
        this.sendOtpButton = page.getByRole('button', { name: 'Send OTP' });
        this.verifyOtpButton = page.getByRole('button', { name: 'Verify OTP' });
        this.otpDigitInputs = Array.from({ length: 6 }, (_, i) => page.locator(`#_r_${i + 3}_`));
    }

    // Methods
    async login(phone = LOGIN.phone, otp = LOGIN.otp) {
        
        await this.getStartedButton.click();
        await this.phoneInput.fill(phone);
        await this.sendOtpButton.click();

        const digits = otp.split('');
        for (let i = 0; i < 6; i++) {
            await this.otpDigitInputs[i].fill(digits[i] ?? '');
        }

        await this.verifyOtpButton.click();
    }

    // async verifyPageTitle() {

    //     await expect(this.page).toHaveTitle('Data Collection & Quality Check');

    // }
}

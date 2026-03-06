import { expect } from '@playwright/test';

/**
 * Page object for the full Job Creation flow: dashboard, data collection, recording, and success.
 */
export class JobCreationPage {

    constructor(page) {
        this.page = page;

        // Dashboard
        this.collectDataButton = page.getByText('Collect Data', { exact: true });

        // Data collection – dropdowns by purpose (location screen: district, school; student screen: gender, grade)
        this.districtDropdown = page.locator('(//div[contains(@class,"Dropdown-module__yG70Qq__dropdown-container")])[2]');
        this.schoolDropdown = page.locator('(//div[contains(@class,"Dropdown-module__yG70Qq__dropdown-container")])[3]');
        this.genderDropdown = page.locator('(//div[contains(@class,"Dropdown-module__yG70Qq__dropdown-container")])[1]');
        this.gradeDropdown = page.locator('(//div[contains(@class,"Dropdown-module__yG70Qq__dropdown-container")])[2]');
        this.dropdownTriggerSelector = '[role="button"], div[class*="MuiSelect-select"]';
        this.listbox = page.getByRole('listbox');

        this.proceedButton = page.getByRole('button', { name: 'Proceed' });
        this.skipButton = page.getByRole('button', { name: 'Skip' });
        this.nameInput = page.getByLabel('Name');
        this.generateConsentIdButton = page.getByRole('button', { name: 'Generate Consent ID' });
        this.takePhotoInput = page.locator("//p[contains(text(),'Take photo')]");

        // Dashboard – Start job (second Start button)
        this.startJobButton = page.locator("//p[text()='CG_Gr_1-8_En_Para']/following::button[text()='Start'][1]");

        // Recording
        this.startRecordingButton = page.getByRole('button', { name: 'Start' });
        this.stopRecordingButton = page.getByRole('button', { name: 'Stop' });
        this.saveButton = page.getByText('Save', { exact: true });
        this.submitButtons = page.getByRole('button', { name: 'Submit' });
        this.audioFineCheckbox = page.getByLabel('Audio seems fine');
        this.successMessage = page.getByText('Record Saved Successfully', { exact: false });

    }

    async selectOptionInDropdown(dropdownLocator, optionText) {

        await dropdownLocator.scrollIntoViewIfNeeded();
        const trigger = dropdownLocator.locator(this.dropdownTriggerSelector).first();
        await trigger.click();
        await this.listbox.getByText(optionText, { exact: true }).click();

    }

    // —— Major feature: Start job and go to Collect Data ——
    async startJobAndCollectData() {

        await this.page.waitForTimeout(3000);
        const startButton = this.startJobButton;

        await expect(startButton).toBeVisible({ timeout: 10000 });
        await expect(startButton).toBeEnabled({ timeout: 10000 });

        await startButton.scrollIntoViewIfNeeded();

        // trial click ensures element is actually clickable
        await startButton.click({ trial: true });
        await startButton.click();

        await expect(this.collectDataButton).toBeVisible({ timeout: 10000 });
        await this.collectDataButton.click();

    }


    // —— Major feature: Fill location (Proceed, Skip, District, School) and proceed ——
    async fillLocationAndProceed(district = 'Balrampur', school = '22260910001 - P.S. NEHRUNAGAR') {

        await this.proceedButton.click();
        await this.skipButton.click();
        await this.selectOptionInDropdown(this.districtDropdown, district);
        await this.selectOptionInDropdown(this.schoolDropdown, school);
        await this.proceedButton.click();

    }

    // —— Major feature: Fill student details (Name, Gender, Grade) and proceed ——
    async fillStudentDetailsAndProceed(firstName, lastName, gender = 'Male', grade = '1') {

        await expect(this.nameInput).toBeVisible();
        await this.nameInput.fill(`${firstName} ${lastName}`);
        await this.selectOptionInDropdown(this.genderDropdown, gender);
        await this.selectOptionInDropdown(this.gradeDropdown, grade);
        await this.proceedButton.click();

    }

    // —— Major feature: Consent ID, photo upload, and proceed ——
    async fillConsentAndPhoto(imagePath) {

        await this.generateConsentIdButton.click();
        await this.takePhotoInput.setInputFiles(imagePath);
        await this.proceedButton.click();
        await this.proceedButton.click();

    }

    // —— Major feature: Record, stop, save, and submit (with confirmation) ——
    async recordAndSubmit(options = {}) {

        const { stopTimeout = 30000, saveTimeout = 60000, submitTimeout = 30000 } = options;

        await this.startRecordingButton.click();
        await expect(this.stopRecordingButton).toBeVisible({ timeout: stopTimeout });
        await this.stopRecordingButton.click();
        await expect(this.saveButton).toBeVisible({ timeout: saveTimeout });
        await expect(this.saveButton).toBeEnabled({ timeout: saveTimeout });
        await this.saveButton.click();

        await expect(this.submitButtons.first()).toBeEnabled();
        await this.submitButtons.first().click();
        // await this.audioFineCheckbox.check();
        await expect(this.submitButtons).toBeEnabled({ timeout: submitTimeout });
        await this.submitButtons.click();

    }

    async expectRecordSaved() {

        await expect(this.successMessage).toBeVisible();

    }

}


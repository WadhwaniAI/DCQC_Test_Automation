import path from 'path';
import { test } from '@playwright/test';
import { BASE_URL } from '../config/constants.js';
import { login } from '../utils/login.js';
import { JobCreationPage } from '../pages/JobCreationPage.js';

test('Job Creation', async ({ page }) => {
    await page.goto(BASE_URL);
    await login(page);

    const jobPage = new JobCreationPage(page);

    await jobPage.startJobAndCollectData('CG_Gr_1-8_En_Para');
    await jobPage.fillLocationAndProceed('Balrampur', '22260910001 - P.S. NEHRUNAGAR');

    const firstName = `User_${Date.now()}`;
    const lastName = `Auto_${Math.random().toString(36).slice(2, 8)}`;
    await jobPage.fillStudentDetailsAndProceed(firstName, lastName, 'Male', '1');

    const imagePath = path.join(process.cwd(), 'test-data', 'images', 'StockCake-Kids_Reading_Together-897493-small.jpg');
    await jobPage.fillConsentAndPhoto(imagePath);

    await jobPage.recordAndSubmit();
    await jobPage.expectRecordSaved();
});

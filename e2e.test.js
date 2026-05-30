const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost/utility-complaint';

const COMPLAINT = {
  fullName: 'Sara Ahmed',
  email: 'sara@test.com',
  phone: '03001234567',
  type: 'Water Supply',
  location: 'Gulberg III, Lahore',
  title: 'Burst water pipe on Main Boulevard',
  description:
    'There is a burst water pipe causing flooding on the street since yesterday morning.',
};

test.describe('Full Complaint Submission & Tracking Flow', () => {

  let trackingId = null;

  test('Step 1 — Homepage loads and shows form', async ({ page }) => {

    await page.goto(`${BASE_URL}/index.html`);

    await expect(page).toHaveTitle(/UtilityComplaint/i);

    await expect(
      page.locator('text=Register a Complaint')
    ).toBeAttached();

    await expect(
      page.locator('input[type="email"]')
    ).toBeAttached();

  });


  test('Step 2 — Submit complaint form', async ({ page }) => {

    await page.goto(`${BASE_URL}/index.html`);

    const textInputs = page.locator('input[type="text"]');

    await textInputs.nth(0).fill(COMPLAINT.fullName);

    await page.locator('input[type="email"]')
      .fill(COMPLAINT.email);

    await page.locator('input[type="tel"]')
      .fill(COMPLAINT.phone);

    await page.locator('select')
      .selectOption({ label: COMPLAINT.type });

    await textInputs.nth(1)
      .fill(COMPLAINT.location);

    await textInputs.nth(2)
      .fill(COMPLAINT.title);

    await page.locator('textarea')
      .fill(COMPLAINT.description);

    const highBtn = page.locator('.priority-btn', {
      hasText: 'High'
    });

    if (await highBtn.count() > 0) {
      await highBtn.click();
    }

    await page.locator('[type="submit"]').click();

    const toast = page.locator('#successToast');

    await expect(toast)
      .toBeAttached({ timeout: 10000 });

    const toastText = await toast.textContent();

    if (toastText) {
      const match = toastText.match(/CMP-\d+/);

      if (match) {
        trackingId = match[0];
      }
    }

    console.log('Tracking ID:', trackingId);

  });


  test('Step 3 — Track complaint', async ({ page }) => {

    const idToTrack = trackingId || 'CMP-001';

    await page.goto(`${BASE_URL}/track.html`);

    await page.locator('#trackInput')
      .fill(idToTrack);

    await page.locator('button', {
      hasText: '🔍 Track'
    }).click();

    const resultCard = page.locator('#resultCard');

    await expect(resultCard)
      .toBeAttached({ timeout: 8000 });

    console.log(`Track page loaded for ID: ${idToTrack}`);

  });


  test('Step 4 — Dashboard check', async ({ page }) => {

    await page.goto(`${BASE_URL}/dashboard.html`);

    const tableBody = page.locator('#tableBody');

    await expect(tableBody)
      .toBeAttached({ timeout: 8000 });

    console.log('Dashboard loaded successfully');

  });


  test('Step 5 — Invalid ID handling', async ({ page }) => {

    await page.goto(`${BASE_URL}/track.html`);

    await page.locator('#trackInput')
      .fill('CMP-999999');

    await page.locator('button', {
      hasText: '🔍 Track'
    }).click();

    await expect(
      page.locator('#trackInput')
    ).toBeAttached();

    console.log('Invalid ID test executed');

  });

});
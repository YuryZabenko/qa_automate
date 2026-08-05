import { test, expect } from '../../../fixtures/fixtures.js';
import { TestCasesPage } from '../../../pages/testCases.page.js';
import { ApiTestingPage } from '../../../pages/apiTesting.page.js';

test.describe('Slider tests', () => {
  test('should have correct number of slides', { tag: ['@regression', '@positive', '@ui'] }, async ({ homePage }) => {
    await expect(homePage.sliderContainer).toBeVisible();
    const slideCount = homePage.slides;
    await expect(slideCount).toHaveCount(homePage.sliderCount);
  });

  test('should navigate to next slide', { tag: ['@regression', '@positive', '@ui'] }, async ({ homePage }) => {
    const currentIndex = await homePage.getActiveSlideIndex();
    await homePage.nextButton.click();
    const newIndex = await homePage.getActiveSlideIndex();
    expect(newIndex).toBe(currentIndex + 1);
  });

  test('should navigate to previous slide', { tag: ['@regression', '@positive', '@ui'] }, async ({ homePage }) => {
    await homePage.indicators.nth(1).click();
    const currentIndex = await homePage.getActiveSlideIndex();
    await homePage.prevButton.click();
    const newIndex = await homePage.getActiveSlideIndex();
    expect(newIndex).toBe(currentIndex - 1);
  });

  test(
    'should switch slide by clicking indicator',
    { tag: ['@regression', '@positive', '@ui'] },
    async ({ homePage }) => {
      await homePage.indicators.nth(2).click();
      const activeIndex = await homePage.getActiveSlideIndex();
      expect(activeIndex).toBe(2);
    },
  );

  test(
    'should "Test Cases Button" redirect to "Test Cases Page"',
    { tag: ['@regression', '@positive', '@ui'] },
    async ({ homePage, page }) => {
      await expect(homePage.testCasesButton).toBeVisible();
      await homePage.testCasesButton.click();
      const testCasesPage = new TestCasesPage(page);
      await expect(testCasesPage.titleTextLocator).toBeVisible();
      await expect(testCasesPage.titleTextLocator).toHaveText(testCasesPage.titleText);
    },
  );

  test(
    'should "Api List Button" redirect to "API Testing Page"',
    { tag: ['@regression', '@positive', '@ui'] },
    async ({ homePage, page }) => {
      await expect(homePage.testCasesButton).toBeVisible();
      await homePage.apiListButton.click();
      const apiTestingPage = new ApiTestingPage(page);
      await expect(apiTestingPage.titleTextLocator).toBeVisible();
      await expect(apiTestingPage.titleTextLocator).toHaveText(apiTestingPage.titleText);
    },
  );
});

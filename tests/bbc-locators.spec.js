import {test, expect} from '@playwright/test';


test.describe('bbc locators tests', () => {
   test('should display main BBC page elements', async ({page}) => {
     const url = 'https://www.bbc.com/';
     const title = 'BBC Home - Breaking News, World News, US News, Sports, Business, Innovation, Climate, Culture, Travel, Video & Audio'
     // get by role
     const openMenu = page.getByRole('button', { name: 'Open menu' })
     const signIn = page.getByRole('button', { name: 'Sign In' })
     // get by css
     const mainIcon = page.locator('#bbc-header [icon="bbc"]')
     const selectLanguage = page.locator("button[class^='LanguageDropdown']")
     // get by xpath & link
     const newsNavigate = page.locator('xpath=//*[@id=\'main-navigation-container\']').getByRole('link', { name: 'News' })
     // get by data-testId
     const mainNewsImage = page.getByTestId('vermont-grid').getByTestId('card-media-wrapper');
     const firstSideNewsHeader = page.getByTestId('manchester-card').getByTestId('card-headline').first();
     const homeNavigateActive = page.getByTestId('mainNavigationLink-active');

     await page.goto(url);
     await expect(page).toHaveTitle(title);

     // to be visible
     await expect(openMenu).toBeVisible();
     await expect(signIn).toBeVisible();
     await expect(mainIcon).toBeVisible();
     await expect(newsNavigate).toBeVisible();
     await expect(mainNewsImage).toBeVisible();
     await expect(firstSideNewsHeader).toBeVisible();

     // contain text
     await expect(selectLanguage).toContainText('BBC in other languages');
     await expect(homeNavigateActive).toContainText('Home');
   })
})

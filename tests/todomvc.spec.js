import { test, expect } from '@playwright/test';

test.describe('tests for todomvc app', async () => {
  test.beforeEach(async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc/');
  })

  test.describe('desktop tests', async () => {
    test('Task 1 - should visible general elements app', async ({ page }) => {
      await expect(page.getByRole('heading', {name: 'todos'})).toBeVisible;
      await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
    });

    test('Task 2 - should create three active task', async ({ page }) => {
      await page.getByPlaceholder('What needs to be done?').fill('Learn Playwright');
      await page.keyboard.press('Enter');

      await page.getByPlaceholder('What needs to be done?').fill('Write API tests');
      await page.keyboard.press('Enter');

      await page.getByPlaceholder('What needs to be done?').fill('Review homework');
      await page.keyboard.press('Enter');

      await expect(page.getByTestId('todo-item')).toHaveCount(3);
      await expect(page.getByTestId('todo-count')).toHaveText('3 items left');
      await expect(page.getByTestId('todo-item').nth(0)).toHaveText('Learn Playwright');
      await expect(page.getByTestId('todo-item').nth(1)).toHaveText('Write API tests');
      await expect(page.getByTestId('todo-item').nth(2)).toHaveText('Review homework');
    });

    test('Task 3 - should check the completion of the task and the operation of the filters', async ({page}) => {
      await page.getByPlaceholder('What needs to be done?').fill('task1');
      await page.keyboard.press('Enter');

      await page.getByPlaceholder('What needs to be done?').fill('task2');
      await page.keyboard.press('Enter');

      await page.getByPlaceholder('What needs to be done?').fill('task3');
      await page.keyboard.press('Enter');

      await page.getByLabel('Toggle Todo').nth(0).check();
      await expect(page.getByLabel('Toggle Todo').nth(0)).toBeChecked();

      await page.getByRole('link', { name: 'Active' }).click();
      await expect(page.getByRole('link', { name: 'Active' })).toContainClass('selected');
      await expect(page.getByTestId('todo-item')).toHaveCount(2);
      await expect(page.getByTestId('todo-item').nth(0)).toHaveText('task2');
      await expect(page.getByTestId('todo-item').nth(1)).toHaveText('task3');

      await page.getByRole('link', { name: 'Completed' }).click();
      await expect(page.getByRole('link', { name: 'Completed' })).toContainClass('selected');
      await expect(page.getByTestId('todo-title')).toHaveText('task1');

      await page.getByRole('link', { name: 'All' }).click();
      await expect(page.getByRole('link', { name: 'All' })).toContainClass('selected');
      await expect(page.getByTestId('todo-item')).toHaveCount(3);
    })

    test('Task 4 - should edit the task and the updated value should be displayed in the list.', async ({page}) => {
      await page.getByPlaceholder('What needs to be done?').fill('Old task name');
      await page.keyboard.press('Enter');

      await page.getByTestId('todo-title').dblclick();
      await page.getByLabel('Edit').fill('Updated task name');
      await page.keyboard.press('Enter');

      await expect(await page.getByTestId('todo-title')).not.toHaveText('Old task name');
      await expect(await page.getByTestId('todo-title')).toHaveText('Updated task name');
    })

    test('Task 5',  async ({page}) => {
      await page.getByPlaceholder('What needs to be done?').fill('Todo task 1');
      await page.keyboard.press('Enter');

      await page.getByPlaceholder('What needs to be done?').fill('Todo task 2');
      await page.keyboard.press('Enter');

      await page.getByPlaceholder('What needs to be done?').fill('Todo task 3');
      await page.keyboard.press('Enter');

      await page.getByTestId('todo-item').first().click();
      await page.getByLabel('Delete').first().click();
      await expect(page.getByTestId('todo-item')).toHaveCount(2);

      await page.getByLabel('Toggle Todo').nth(0).check();
      await expect(page.getByLabel('Toggle Todo').nth(0)).toBeChecked();

      await page.locator('.clear-completed').click();
      await expect(page.getByText('Todo task 2')).toBeHidden();

      await expect(page.getByTestId('todo-item')).toHaveCount(1);

    })

    test('Task 6 - After the page is reloaded, the tasks and their statuses should be saved.', async ({page, browser}) => {
      await page.getByPlaceholder('What needs to be done?').fill('Persistent task 1');
      await page.keyboard.press('Enter');

      await page.getByPlaceholder('What needs to be done?').fill('Persistent task 2');
      await page.keyboard.press('Enter');

      await page.getByLabel('Toggle Todo').nth(0).check();
      await expect(page.getByLabel('Toggle Todo').nth(0)).toBeChecked();
      await expect(page.getByTestId('todo-item')).toHaveCount(2);

      await page.context().storageState({ path: 'storageState.json' });

      // Перезагрузка страницы и так сохраняет состояние браузера, поэтому создаем новую, так как нужно проверить storageState
      const newContext = await browser.newContext({storageState: 'storageState.json'});
      const newPage = await newContext.newPage();

      await newPage.goto('https://demo.playwright.dev/todomvc/');
      await expect(page.getByTestId('todo-item')).toHaveCount(2);
      await expect(page.getByLabel('Toggle Todo').nth(0)).toBeChecked();
      await expect(newPage.getByText('Persistent task 1')).toBeVisible();
      await expect(newPage.getByText('Persistent task 2')).toBeVisible();
    })

    test('Task 7 - should compare the current state of the interface with the reference screenshot', async ({page}) => {
      await page.getByPlaceholder('What needs to be done?').fill('task 1');
      await page.keyboard.press('Enter');

      await page.getByPlaceholder('What needs to be done?').fill('task 2');
      await page.keyboard.press('Enter');

      await page.getByPlaceholder('What needs to be done?').fill('task 3');
      await page.keyboard.press('Enter');

      await page.getByLabel('Toggle Todo').nth(0).check();
      await expect(page.locator('.todo-list')).toHaveScreenshot('tasksDesktop.png',);
    })
  })
  test.describe('mobile tests', async () => {

    test.use({viewport: {width: 390, height: 844}})

    test('Task * - should compare the current state of the mobile interface with the reference screenshot', async ({page}) => {
      await page.getByPlaceholder('What needs to be done?').fill('task 1');
      await page.keyboard.press('Enter');

      await page.getByPlaceholder('What needs to be done?').fill('task 2');
      await page.keyboard.press('Enter');

      await expect(page.getByLabel('Toggle Todo').nth(0)).toBeVisible();
      await expect(page.getByLabel('Toggle Todo').nth(1)).toBeVisible();

      await expect(page.locator('.todo-list')).toHaveScreenshot('tasksMobile.png');
    })
  })
})


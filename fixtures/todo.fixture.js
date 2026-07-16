import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage.js';

export const test = base.extend({
    todoPage: async ({ page }, use) => {
        const todoPage = new TodoPage(page);
        await todoPage.open();
        await use(todoPage);
    },
});

export { expect } from '@playwright/test';
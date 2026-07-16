import { expect } from '@playwright/test';

export class TodoPage {
    constructor(page) {
        this.page = page;

        /** @type {import('@playwright/test').Locator} */
        this.heading = page.getByRole('heading', { name: 'todos' });

        /** @type {import('@playwright/test').Locator} */
        this.inputField = page.getByPlaceholder('What needs to be done?');

        /** @type {import('@playwright/test').Locator} */
        this.todoItems = page.getByTestId('todo-item');

        /** @type {import('@playwright/test').Locator} */
        this.todoTitles = page.getByTestId('todo-title');

        /** @type {import('@playwright/test').Locator} */
        this.todoCount = page.getByTestId('todo-count');

        /** @type {import('@playwright/test').Locator} */
        this.clearCompleted = page.locator('.clear-completed');

        /** @type {import('@playwright/test').Locator} */
        this.todoList = page.locator('.todo-list');

        this.filters = {
            /** @type {import('@playwright/test').Locator} */
            all: page.getByRole('link', { name: 'All' }),

            /** @type {import('@playwright/test').Locator} */
            active: page.getByRole('link', { name: 'Active' }),

            /** @type {import('@playwright/test').Locator} */
            completed: page.getByRole('link', { name: 'Completed' }),
        };
    }

    /**
     * Открывает сайт
     */
    async open() {
        await this.page.goto('');
    }

    /**
     * Добавляет новую задачу
     * @param {String} todoText - текст задачи
     */
    async addTodo(todoText) {
        await this.inputField.fill(todoText);
        await this.page.keyboard.press('Enter');
    }

    /**
     * Добавляет несколько задач
     * @param {Array} todoList - массив задач
     */
    async addTodos(todoList) {
        for (const todo of todoList) {
            await this.addTodo(todo);
        }
    }

    /**
     * Возвращает локатор чекбокса задачи
     * @param {String} todoText - текст задачи
     * @returns {import('@playwright/test').Locator}
     */
    getToggleForTask(todoText) {
        return this.todoItems.filter({ hasText: todoText }).getByLabel('Toggle Todo');
    }

    /**
     * Возвращает локатор задачу по тексту
     * @param {String} todoText - текст задачи
     * @returns {import('@playwright/test').Locator}
     */
    getTodoByText(todoText) {
        return this.todoItems.filter({ hasText: todoText });
    }

    /**
     * Отмечает задачу как выполненную
     * @param {String} todoText - текст задачи
     */
    async completeTodo(todoText) {
        await this.todoItems.filter({ hasText: todoText }).getByLabel('Toggle Todo').check();
    }

    /**
     * Удаляет задачу
     * @param {String} todoText - текст задачи
     */
    async deleteTodo(todoText) {
        const todo = this.getTodoByText(todoText);
        await todo.hover();
        await todo.getByLabel('Delete').click();
    }

    /**
     * Изменяет текст задачи
     * @param {String} oldText - текст изменяемой задачи
     * @param {String} newText - новый текст задачи
     */
    async editTask(oldText, newText) {
        const todo = this.getTodoByText(oldText);
        await todo.dblclick();
        await this.page.getByLabel('Edit').fill(newText);
        await this.page.keyboard.press('Enter');
    }

    /**
     * Нажимает на кнопку 'Clear Completed'
     */
    async clearCompletedTasks() {
        await this.clearCompleted.click();
    }

    /**
     * Переход на фильтр 'All'
     */
    async filterByAll() {
        await this.filters.all.click();
        await expect(this.filters.all).toHaveClass(/selected/);
    }

    /**
     * Переход на фильтр 'Active'
     */
    async filterByActive() {
        await this.filters.active.click();
        await expect(this.filters.active).toHaveClass(/selected/);
    }

    /**
     * Переход на фильтр 'Completed'
     */
    async filterByCompleted() {
        await this.filters.completed.click();
        await expect(this.filters.completed).toHaveClass(/selected/);
        // Добавил сюда проверку (по факту ожидание) того, что фильтр уже выбран, т.к. тест №3 становится Flaky без неё!
        // Ожидание this.page.waitForLoadState() не помогало

    }

    /**
     * Возвращает массив задач
     */
    async getTodos() {
        const count = await this.todoTitles.count();
        const titles = [];
        for (let i = 0; i < count; i++) {
            const text = await this.todoTitles.nth(i).textContent();
            titles.push(text);
        }
        return titles;
    }

    /**
     * Сохраняет состояние браузера в файл
     * @param {String} path - путь к файлу
     */
    async getStorageState(path) {
        await this.page.context().storageState({ path });
    }

    /**
     * Сравнивает скриншот элемента
     * @param {import('@playwright/test').Locator} selector - Локатор
     * @param {String} name - имя файла
     */
    async takeScreenshot(selector, name) {
        await expect(selector).toHaveScreenshot(name);
    }
}
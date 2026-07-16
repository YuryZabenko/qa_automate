import { test, expect } from '../../fixtures/todo.fixture.js';
import { testData } from '../../test-data/todos.js';

test.describe('mobile tests', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('Task * - should compare the current state of the mobile interface with the reference screenshot', async ({todoPage}) => {
    await todoPage.addTodos(testData.persistentTasks);
    await expect(todoPage.todoTitles).toHaveCount(testData.persistentTasks.length);
    await todoPage.takeScreenshot(todoPage.todoList, 'tasksMobile.png');
  });
});
import { test, expect } from '../../fixtures/todo.fixture.js';
import { testData } from '../../test-data/todos.js';
import {getRandomTodoText} from "../../helpers/random.js";

test.describe('desktop tests', () => {
  test('Task 1 - should visible general elements app', async ({todoPage}) => {
    await expect(todoPage.heading).toBeVisible();
    await expect(todoPage.inputField).toBeVisible();
  });

  test('Task 2 - should create three active task', async ({todoPage}) => {
    await todoPage.addTodos(testData.defaultTasks);
    await expect(todoPage.todoItems).toHaveCount(testData.defaultTasks.length);
    for (let task of testData.defaultTasks) {
      await expect(todoPage.getTodoByText(task)).toBeVisible();
    }
    await expect(todoPage.todoCount).toHaveText(`${testData.defaultTasks.length} items left`);
  });

  test('Task 3 - should check the completion of the task and the operation of the filters', async ({todoPage}) => {
    await todoPage.addTodos(testData.defaultTasks);
    const todoTarget = getRandomTodoText(testData.defaultTasks);
    await todoPage.completeTodo(todoTarget);
    await expect(todoPage.getToggleForTask(todoTarget)).toBeChecked();
    await todoPage.filterByActive();
    await expect(todoPage.getTodoByText(todoTarget)).toBeHidden();
    await todoPage.filterByCompleted();
    await expect(todoPage.todoTitles).toHaveText(todoTarget);
    await expect(todoPage.todoTitles).toHaveCount(1);
    await todoPage.filterByAll();
    await expect(todoPage.todoTitles).toHaveCount(testData.defaultTasks.length);
  });

  test('Task 4 - should edit the task and the updated value should be displayed in the list.', async ({todoPage}) => {
    await todoPage.addTodo(testData.editTask.old);
    await todoPage.editTask(testData.editTask.old, testData.editTask.new);
    await expect(todoPage.todoTitles).not.toHaveText(testData.editTask.old);
    await expect(todoPage.todoTitles).toHaveText(testData.editTask.new);
  });

  // НаписаЛ с учетом удаления и завершения рандомных задач, и возможности увеличения количества задач в тестовых данных (defaultTasks)
  test('Task 5 - should delete and clear completed', async ({todoPage}) => {
    await todoPage.addTodos(testData.defaultTasks);

    const deletedTodo = getRandomTodoText(testData.defaultTasks);
    await todoPage.deleteTodo(deletedTodo);
    let currentTodos = await todoPage.getTodos();
    expect(currentTodos.length).toEqual(testData.defaultTasks.length - 1);

    const completedTodo = getRandomTodoText(currentTodos);
    await todoPage.completeTodo(completedTodo);
    await todoPage.clearCompletedTasks();
    await expect(todoPage.getTodoByText(completedTodo)).toBeHidden();

    currentTodos = await todoPage.getTodos();
    const todosForCheck = testData.defaultTasks.filter(task => task !== completedTodo && task !== deletedTodo);
    expect(currentTodos).toEqual(todosForCheck);
    await expect(todoPage.todoTitles).toHaveCount(testData.defaultTasks.length - 2);
  });

  test('Task 6 - After the page is reloaded, the tasks and their statuses should be saved.', async ({todoPage}) => {
    await todoPage.addTodos(testData.persistentTasks);
    await todoPage.completeTodo(testData.persistentTasks[0]);
    await todoPage.getStorageState('storageState.json');
    await todoPage.page.reload();
    await expect(todoPage.todoTitles).toHaveCount(testData.persistentTasks.length);
    await expect(todoPage.getToggleForTask(testData.persistentTasks[0])).toBeChecked();
  });

  test('Task 7 - should compare the current state of the interface with the reference screenshot', async ({todoPage}) => {
    await todoPage.addTodos(testData.defaultTasks);
    await todoPage.completeTodo(testData.defaultTasks[0]);
    await todoPage.takeScreenshot(todoPage.todoList, 'tasksDesktop.png');
  });
});
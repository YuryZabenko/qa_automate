export function getRandomTodoText(array) {
    return array[Math.floor(Math.random() * array.length)];
}
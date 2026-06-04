// ========== Task 1. Reverse array ==========
const numbersTask1 = [1, 2, 3, 4, 5, 6];
const newNumbersTask1 = numbersTask1.toReversed();
console.log(`Numbers: ${numbersTask1}`);
console.log(`Reversed numbers: ${newNumbersTask1}`);
// Изменения исходного массива может привести к багам и сложно отлаживать


// ========== Task 2. Find max and min number ==========
const numbersTask2 = [3, 67, 15, 89, 24, 7, 101, 36];

// через цикл #1
let maxValue= -Infinity;
let minValue = Infinity;
for (let i of numbersTask2) {
    if (i > maxValue) {
        maxValue = i;
    }
    if (minValue > i) {
        minValue = i;
    }
}
console.log(`Max value: ${maxValue}`);
console.log(`Min value: ${minValue}`);

// через объект `Math`
function getMaxOfArray(numArray) {
   return Math.max.apply(null, numArray);
}
function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
}
console.log('Max value Math', getMaxOfArray(numbersTask2));
console.log('Min value Math', getMinOfArray(numbersTask2));

// ========== Task 3. Fibonacci array ==========
const startIndex = 3;
const length = 7;

const array = [0, 1]
for (let i = 1; i < startIndex+length-1;  i++) {
    let previousNumber1 = array[array.length-1];
    let previousNumber2 = array[array.length-2]
    let numberToPush = previousNumber1 + previousNumber2
    array.push(numberToPush);
}

for (let i= startIndex; i > 0; i--) {
    array.shift();
}
console.log('Fibonacci array:\n', array);

// ========== Task 4. Bulls and Cows ==========
const secret = 3487;
const guess = 3794;

const secretArray = secret.toString().split('').map(Number);
const guessArray = guess.toString().split('').map(Number);

let positionSame = 0;
let valueSame = 0;
for (let i = 0; i < secretArray.length; i++) {
    if (secretArray[i] === guessArray[i]) {
        positionSame++
    } else if (guessArray.includes(secretArray[i])) {
        valueSame++
    }
}

console.log(`Same position: ${positionSame}`);
console.log(`Same value but different position: ${valueSame}`);

// ========== Task 5. Sort and filter users ==========
const users = [
    { name: "Alex", age: 25, city: "Warsaw" },
    { name: "Maria", age: 32, city: "Gdansk" },
    { name: "John", age: 19, city: "Berlin" },
    { name: "Oleg", age: 41, city: "Warsaw" },
    { name: "Anna", age: 25, city: "Krakow" }
];

const usersAgeAscending = users.toSorted(function (a, b) {
    if (a.age > b.age) {
        return 1;
    }
    if (a.age < b.age) {
        return -1;
    }
})
console.log('Users sorted by age ascending:\n', usersAgeAscending);

const usersAgeDescending = users.toSorted(function (a, b) {
    if (a.age < b.age) {
        return 1;
    }
    if (a.age > b.age) {
        return -1;
    }
})
console.log('Users sorted by age descending:\n', usersAgeDescending);

const usersByName = users.toSorted(function (a, b) {
    if (a.name > b.name) {
        return 1;
    }
    if (a.name < b.name) {
        return -1;
    }
})
console.log('Users sorted by name:\n', usersByName);

const nameArray = [];
for (let i of users) {
    nameArray.push(i.name);
}
console.log(`User names:`, nameArray);

const result = Object.groupBy(users, ({age}) =>
    age > 25 ? 'ok' : 'not'
);
console.log('Users older than 25:\n', result.ok);

const result1 = users.find(element => {
    if (element.city === 'Warsaw') {
        return element;
    }
})
console.log('First user from Warsaw:', result1);

// ========== Task 6. Remove duplicates and analyze products ==========
const products = [
    { id: 1, title: "Phone", price: 1200, category: "electronics" },
    { id: 2, title: "Laptop", price: 2500, category: "electronics" },
    { id: 3, title: "Book", price: 40, category: "books" },
    { id: 4, title: "Phone", price: 1200, category: "electronics" },
    { id: 5, title: "Pen", price: 5, category: "stationery" },
    { id: 6, title: "Book", price: 40, category: "books" }
];

// 1. Удалить повторяющиеся товары.
// Завел функцию для удаления повторяющихся товаров, что бы было всё в одно месте
function deleteRepeats(array) {

    // Отсортировал по title
    array.sort(function (a, b) {
        if (a.title > b.title) {
            return 1;
        }
        if (a.title < b.title) {
            return -1;
        }
    })

    // Сравниваю по title и price в соседних элементах, так как отсортированы по имени, находятся всегда рядом, если совпадают - удаляю
    for (let i = 1; i < array.length; i++) {
        if (array[i].title === array[i-1].title && array[i].price === array[i-1].price) {
            array.splice(i, 1);
        }
    }
    return array;
}
console.log('Array without repeats:\n', deleteRepeats(products)); // вызываем функцию, удаля все повторения и выводим в консоль

// 2. Получить массив всех названий товаров.
// 3. Получить массив всех категорий без повторений.
// 4. Посчитать общую стоимость всех уникальных товаров.
const titleArray = [];
const categoryArray = [];
let totalCost = 0;
for (let i of products) {
    if (!titleArray.includes(i.title)) titleArray.push(i.title);
    if (!categoryArray.includes(i.category)) categoryArray.push(i.category);
    totalCost += i.price;
}
console.log('Title array:', titleArray);
console.log('Category array:', categoryArray);
console.log('Total cost:', totalCost);

// 5. Создать объект, где:
// * ключ — это категория товара;
// * значение — количество уникальных товаров в этой категории.
const categoryCount = {};
for (let i of products) {
    if (!categoryCount[i.category]) {
        categoryCount[i.category] = 0
    }
    categoryCount[i.category] += 1;
}
console.log('Item count in category', categoryCount);

// 6. Для одного любого товара вывести:
// * все ключи объекта;
console.log('All keys:', Object.keys(products[0]));
// * все значения объекта;
console.log('All values:', Object.values(products[0]));
// * все пары ключ-значение.
console.log('All entries:\n', Object.entries(products[0]));
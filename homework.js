// Task 1. Объявление переменных
const name = 'Yury Zabenko';    // имя пользователя;
let age = 42;                  // возраст пользователя;
let isStudent = false;         // является ли пользователь студентом;
let city;                               // город пользователя;
let salary = null;                 // зарплата пользователя.

// Выведите все переменные в консоль.
console.log(name);
console.log(age);
console.log(isStudent);
console.log(city);
console.log(salary);

// Task 2. Проверка типов данных
console.log(typeof name);       // string - строка
console.log(typeof age);        // number - число
console.log(typeof isStudent);  // boolean - булевое значение
console.log(typeof city);       // undefined - переменной не присвоено значение
console.log(typeof salary);     // object (баг языка JS)

// Task 3. Undefined vs Null
let var1;                   // первая переменная должна быть объявлена, но не иметь значения;
let var2 = null;       // вторая переменная должна явно содержать null.

// Выведите обе переменные в консоль.
console.log(var1);
console.log(var2);

// Проверьте их типы через typeof.
console.log(typeof var1);   //undefined - переменной не присвоено значение
console.log(typeof var2);   //object (баг языка JS)

// Разница между undefined и null:
// undefined - переменная создана, но значение не присвоено
// null - переменная создана и ей явно присвоено значение - null

// Task 4
let emptyStr = '';    // пустая строка
let zero = 0;        // число 0
let nul = null;        // null
let und;                    // undefined
let str = 'abc';     // непустая строка
let num = 100;      // любое положительное число

// Преобразуйте каждое значение в boolean с помощью Boolean(). Выведите результат каждого преобразования в консоль.
console.log(Boolean(emptyStr));     // false
console.log(Boolean(zero));         // false
console.log(Boolean(nul));          // false
console.log(Boolean(und));          // false
console.log(Boolean(str));          // true
console.log(Boolean(num));          /// true

// Task 5. Number и преобразование типов
let num1 = 10;          // целое число;
let num2 = 10.5;        // дробное число;
let str1 = '500 abc';    // строка, внутри которой находится число;
let str2 = 'qwerty';     // строка, внутри которой находится обычный текст.

// Проверьте тип каждой переменной с помощью typeof.
console.log(typeof num1);   // number
console.log(typeof num2);   // number
console.log(typeof str1);   // string
console.log(typeof str2);   // string

num1 = +num1;   // Преобразуйте строку с числом в тип number.

// Попробуйте преобразовать строку с текстом в тип number. Выведите результаты в консоль.
console.log(+str2);   // NaN - нельзя преобразовать текст в число (Not a Number)

// Task 6. Проблема точности Number.
// Проверьте результат сложения: 0.1 + 0.2
console.log(0.1 + 0.2);     // result: 0.30000000000000004

// Проверьте, равен ли результат 0.3.
console.log(0.1 + 0.2 === 0.3);     // false
// десятичные дроби в двоичной системе исчисления представляют собой бесконечные периодические дроби, отсюда и погрешность при математических операциях

// Task 7. Работа со строками
let str3 = '  Фраза про JavaScript  ';    //Создайте строку, содержащую текст с пробелами в начале и в конце.

console.log(str3.length);   // Выведите длину строки.
console.log(str3.trim());   // Удалите лишние пробелы в начале и в конце строки.
console.log(str3.toUpperCase());    // Преобразуйте строку в верхний регистр.
console.log(str3.toLowerCase());    // Преобразуйте строку в нижний регистр.
console.log(str3.includes('JavaScript'));    // Проверьте, содержит ли строка определённое слово.
console.log(str3.indexOf('JavaScript'))     // Найдите индекс определённого слова в строке.
const literalString = `Переменная str3 содержит текст: "${str3}"`;  //Создайте новую строку с помощью template literal.
console.log(literalString);     // Выведите все результаты в консоль.
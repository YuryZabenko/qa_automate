// ========================================== TASK 1 ==========================================
function stringToCurrency(array) {
    let errorCounter = 0;
    let errorMessage = 'ERROR! Incorrect data type:\n';
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] !== 'string' || array[i] === undefined) {
            errorCounter += 1;
            errorMessage += `${array[i]} - not a string\n`;
        } else if (array[i].trim().length === 0) {
            errorCounter += 1;
            errorMessage += `'${array[i]}' - empty string\n`;
        } else if (
            isNaN(Number(array[i])) ||
            array[i] === 'Infinity' ||
            array[i] === '-Infinity' ||
            array[i].startsWith('.') ||
            array[i].endsWith('.') ||
            array[i].startsWith('-.')
        ) {
            errorCounter += 1;
            errorMessage += `${array[i]} - non-numeric format string\n`;
        }
    }
    if (errorCounter > 0) {
        console.log(errorMessage);
        return false;
    }
    for (let item of array) {
        let result = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(item);
        console.log(result);
    }
}

// TODO uncomment what you need to call the function
//incorrect format
// const exampleArrayTask1 = ['', '  ', '.', '456.4.56', '.5', '-.5', '6.', 'Infinity', null, undefined, NaN, Infinity, ['asd'], {}];

//correct format
// const exampleArrayTask1 = ['1234567', '-555545', '10.5', '15.5456', '11.1526', '66.55', '0'];

// stringToCurrency(exampleArrayTask1);


// ========================================== TASK 2 ==========================================
function sortTrueArray(array) {
     return array.filter(Boolean).sort((a, b) => (b > a)-(a > b));
}

// TODO uncomment to call the function
// const exampleArrayTask2 = ['5', true, false, 10, 100, 'example', 'zero', 0, null]
// console.log(sortTrueArray(exampleArrayTask2));


// ========================================== TASK 3 ==========================================
function groupByAge(array) {
    const result = {}
    for (let item of array) {
        if (!Object.hasOwn(result, item.age)) {
            result[item.age] = [];
        }
        result[item.age].push(item.name);
    }
    console.log(result);
}

// TODO uncomment to call the function
// const exampleArrayTask3 = [{name: 'Ivan', age: 20}, {name: 'Maria', age: 18}, {name: 'Pavel', age: 18}];
// groupByAge(exampleArrayTask3);

// ========================================== TASK 4 ==========================================
async function promiseFunctions(array) {
    const promises = array.map(func => func());
    return await Promise.all(promises);
}

// TODO uncomment to call the function
// const exampleFunction1 = () => new Promise((resolve) => {
//     setTimeout(() => resolve("3 seconds"), 3000);
// });
// const exampleFunction2 = () => new Promise((resolve) => {
//     setTimeout(() => resolve("1 seconds"), 1000);
// });
// const exampleFunction3 = () => new Promise((resolve) => {
//     setTimeout(() => resolve("2 seconds"), 2000);
// });
// const exampleArrayTask4 = [exampleFunction1, exampleFunction2, exampleFunction3]
//
// console.log(await promiseFunctions(exampleArrayTask4));


// ========================================== TASK 5 ==========================================
function startProgram() {
    let maxNum
    while (true) {
        let num = +prompt(`Enter an integer from 1 to 10`)

        if (isNaN(num) || num < 1 || num > 10 || num % 1 !== 0) {
            alert(`Incorrect data, use positive integers from 1 to 10`);
            continue;
        }

        maxNum = num;
        multiplicationTable(maxNum);
        break;
    }
}

function multiplicationTable(maxNum) {
    const maxNumLength = (maxNum * maxNum).toString().length;
    const sideLength = maxNum.toString().length + 3;
    let firstString = (`x |`).padStart(sideLength, ' ');
    for (let i = 1; i <= maxNum; i++) {
        firstString += ' ' + i.toString().padStart(maxNumLength, ' ');
    }

    let sumOfRowsString = '';
    let sumOfTable = 0;
    const stringArray = [];
    for (let i = 1; i <= maxNum; i++) {
        let str = (`${i} |`).padStart(sideLength, ' ');
        let rowsArray = [];
        for (let j = 1; j <= maxNum; j++) {
            const multiplyNum = i * j;
            rowsArray.push(multiplyNum);
            str += ' ' + multiplyNum.toString().padStart(maxNumLength, ' ');
        }
        stringArray.push(str);

        let sumRow = 0;
        for (let item of rowsArray) {
            sumRow += item;
        }
        sumOfTable += sumRow;
        sumOfRowsString += sumRow.toString()+' ';
    }

    let sumOfColsString = sumOfRowsString
    const separator = ''.padStart(firstString.length, '-');
    console.log(separator)
    console.log(firstString);
    console.log(separator)
    stringArray.forEach((item) => {
        console.log(item);
    })
    console.log(separator)
    console.log(`Sum of Rows: ${sumOfRowsString}`);
    console.log(`Sum of Columns: ${sumOfColsString}`);
    console.log(`Total Sum of Table: ${sumOfTable}`);
}

// TODO To test the program, paste the code into the browser console


// ========================================== TASK 6 ==========================================
function squarePromise(num) {
    return new Promise(resolve => {
        setTimeout(() => {
            const result = num * num;
            resolve(result);
        }, 3000);
    });
}

const firstNumberPromise = () => {
    return new Promise(resolve => {
        const randomNum = Math.floor(Math.random() * 9) + 1;
        resolve(randomNum);
    });
};

async function chainPromises() {
    let result = await firstNumberPromise();
    result = await squarePromise(result);
    result = await squarePromise(result);
    console.log(result);
}

// TODO uncomment to call the function
// await chainPromises();
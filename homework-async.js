// ===================================== Precondition function =====================================
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ===================================== Task 1. Promise.race =====================================
const promise1 = new Promise((resolve) => {
    const timeout = getRandom(1, 5)*1000;
    console.log(`Promise 1 delay: ${timeout} ms`);
    setTimeout(resolve, timeout, "1");
});

const promise2 = new Promise((resolve) => {
    const timeout = getRandom(1, 5)*1000;
    console.log(`Promise 2 delay: ${timeout} ms`);
    setTimeout(resolve, timeout, "2");
});

const promise3 = new Promise((resolve) => {
    const timeout = getRandom(1, 5)*1000;
    console.log(`Promise 3 delay: ${timeout} ms`);
    setTimeout(resolve, timeout, "3");
});

Promise.race([promise1, promise2, promise3]).then( (value) => {
    console.log(`Fastest promise result: ${value}`);
});

// ===================================== Task 2. Async / await and square number =====================================
function getNum() {
    return new Promise((resolve) => {
        setTimeout(resolve, 3000, getRandom(1, 5));
    });
}

async function squareNumber() {
    const num = await getNum();
    const square = num**2;
    console.log(`Generated number: ${num}`);
    console.log(`Square: ${square}`);
}
await squareNumber();

// ===================================== Task 3. Sequential async operations =====================================
function getNumOneFive() {
    return new Promise((resolve) => {
        setTimeout(resolve, 3000, getRandom(1, 5));
    });
}

function getNumSixTen() {
    return new Promise((resolve) => {
        setTimeout(resolve, 5000, getRandom(6, 10));
    });
}

async function sumNumbers() {
    const numOneFive = await getNumOneFive();
    const numSixTen = await getNumSixTen();
    const sum = numSixTen + numOneFive;
    console.log(`First number: ${numOneFive}`);
    console.log(`Second number: ${numSixTen}`);
    console.log(`Sum: ${sum}`);
}
await sumNumbers();
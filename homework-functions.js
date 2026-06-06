// =============================== Task 1. Dice game ===============================
function diceGame(playersCount, throwsCount) {

    // Обработка неверных входных данных
    // если не число
    if (typeof(playersCount) !== "number" || typeof(throwsCount) !== "number") {
        return 'Error: Incorrect arguments of dice game. Use numbers instead.';
    // или если игроков меньше двух
    } else if (playersCount < 2) {
        return 'WARN: The number of players must be more than 1';
    // или если количество бросков меньше одного
    } else if (throwsCount < 1) {
        return 'WARN: The number of throws must be at least 1';
    }

    // Функция генерации рандомного броска кубика
    function randomDice(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // собственно сама эмуляция игры через циклы
    let gameResult = {};  // объект куда запишем результаты функции
    for (let player = 1; player <= playersCount; player++) {    // проходимся по количеству игроков
        gameResult[`Player ${player}`] = [];    // сразу добавляем игрока с пустым массивом результатов
        for (let count = 0; count < throwsCount; count++) {     // проходимся по количеству бросков
            let throwResult = randomDice(1, 6);     // бросаем кубик
            let playerScore = gameResult[`Player ${player}`];   // забираем массив результатов
            playerScore.push(throwResult);  // добавляем в массив результат броска
        }
    }

    // функция подсчета общих очков игрока (сумма массива)
    function getSumScores(array) {
        return array.reduce((acc, current) => acc + current, 0);
    }

    // вывод результатов в консоль по каждому игроку
    const playersNames = Object.keys(gameResult);   // забираем имена игроков
    const playersScores = Object.values(gameResult);    // забираем результаты бросков
    let bestScores = 0;     // завдоим переменную для записи максимальных очков
    let bestPlayers = [];       // заодим пустой массив для победителей
    for (let i = 0; i < playersNames.length; i++) {     //проходимся по игрокам
        let totalScores = getSumScores(playersScores[i])        // считаем результаты бросков игрока
        console.log(`${playersNames[i]} throws: ${playersScores[i].join(', ')}. Total: ${totalScores}`);    // выводим результат игрока
        if (totalScores > bestScores) {     //если результат лучше предыдущего
            bestScores = totalScores;       //перезаписываем результат победителя
            if (bestPlayers.length > 0) {   // и если победитель уже был записан
                bestPlayers = [];       // обнуляем массив победителей
            }
            bestPlayers.push(playersNames[i]);  // записываем нового победителя
        } else if (totalScores === bestScores) {    // если количество очков совпадает
            bestPlayers.push(playersNames[i]);      // добавляем ещё одного победителя
        }
    }
    if (bestPlayers.length > 1) {       // если победителей больше 1
        let winners = bestPlayers.join(', ');   // формируем строку с именами победителей
        console.log(`\nDraw between players: ${winners}`);  //выводим в консоль ничью
    } else {    //иначе выводим одного победителя
        let winner = bestPlayers.join('');
        console.log(`\nWinner: ${winner} with ${bestScores} points`);
    }
}
diceGame(3, 5);

// =============================== Task 2. Split number into random parts ===============================
function splitNumber(number, partsCount) {
    // Обработка неверных входных данных
    if (typeof(number) !== "number" || typeof(partsCount) !== "number")     // если не число
        {return 'Error: Incorrect arguments of splitNumber. Use numbers instead.';}
    if (partsCount < 1) return `WARN: Parts count must be more than 0`;     // если количество делений меньше 1
    if (partsCount > number) return `WARN: Part count should not be more than the number`;  //если число делений больше самого числа

    // функция рандомного числа (уже есть такая же в первом задании, можно не писать и вынести ее в глобальную область)
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // цикл деления
    const numArray = [0, number];   // создаем массив с начальной и конечной точками
    let count = 0;      // заводим счетчик
    while (count < partsCount-1) {      // пока счетчик меньше нужного количества делений
        let num = randomNumber(1, number - 1);  // берем рандомное число от 1 до введенного числа - 1 (точка деления)
        if (!numArray.includes(num)) {      // проверяем, не выпадало ли уже такое число ранее (точки не должны повторяться)
            numArray.push(num);     // добавляем в массив
            count++;        // увеличиваем счетчик
        }
    }
    numArray.sort((a, b) => a - b);     // сортируем массив по возрастанию
    const needArray = [];           // создаем пустой массив
    for (let i = numArray.length-1; i > 0; i--) {       // перебираем массив в обратно порядке
        needArray.push(numArray[i] - numArray[i-1]);        // добавляем в новый массив разницу между элементами
    }
    return needArray;   // возвращаем нужный массив
}
console.log(splitNumber(20, 5));

// =============================== Task 3. Count Friday the 13th ===============================
function getFriday13(startDate, endDate) {
    startDate = new Date(startDate);    // переводим вв формат даты
    endDate = new Date(endDate);
    console.log(`Friday 13th dates:`)   // выводим первую строку
    let count = 0;      //заводим счетчик
    while (startDate <= endDate) {      // цикл: пока начальная дата меньше конечной даты
        if (startDate.getDay() === 5 && startDate.getDate() === 13) {   // если день пятница и число 13
            let year = startDate.getFullYear();     // забираем год
            let month = startDate.getMonth() + 1;   // забираем месяц и добавляем 1 (месяцы с 0 начинаются)
            month = month.toString().padStart(2, '0');      // переводим месяц в строку, приводим к двузначной строке добавляя 0 если нужно
            let day = startDate.getDate();          // забираем день
            console.log(`${year}-${month}-${day}`);         // выводим дату в консоль
            count++;    // увеличиваем счетчик
        }
        startDate.setDate(startDate.getDate() + 1);     // дату меняем на следующий день
    }
    console.log(`Total Friday 13th count: ${count}`)    // выводи резултирующую строку
}

getFriday13('2026-01-01', '2026-06-06')
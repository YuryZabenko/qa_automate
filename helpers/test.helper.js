/**
 * Возвращает рандомный индекс
 * @param {number} length - длина массива
 * @param {boolean} skipFirst - пропуск нулевого индекса
 * @returns {number}
 */
export function getRandomIndex(length, skipFirst = false) {
  if (skipFirst) {
    const newLength = length - 1;
    return Math.floor(Math.random() * newLength) + 1;
  }
  return Math.floor(Math.random() * length);
}

/**
 * Возвращает случайную строку
 * @param {number} length - длина строки
 * @param {string} data содержание строки (all, num, str)
 * @returns {string}
 */
export function getRandomString(length = 8, data = 'all') {
  let result = '';
  let chars;
  if (data === 'num') {
    chars = '0123456789';
  } else if (data === 'str') {
    chars = 'abcdefghijklmnopqrstuvwxyz';
  } else {
    chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  }
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Возвращает валидный email
 * @param {string} domain
 * @returns {string}
 */
export function getRandomEmail(domain = `test${Date.now()}.com`) {
  const username = getRandomString(5, 'string');
  return `${username}@${domain}`;
}

/**
 * Блокировщик рекламы
 * @param page
 * @returns {Promise<void>}
 */
export async function addBlock(page) {
  await page.route('**/*', (route) => {
    const url = route.request().url();
    const blocklist = ['google-analytics.com', 'googletagmanager.com', 'doubleclick.net'];

    if (blocklist.some((domain) => url.includes(domain))) {
      return route.abort();
    }
    return route.continue();
  });
}

/**
 * Возвращает рандомное числовое значение
 * @param {number} min - минимальное число
 * @param {number} max - максимальное число
 * @returns {number}
 */
export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Возвращает случайный элемент из массива
 * @param array - массив
 * @returns {*}
 */
export function getRandomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

/**
 * Возвращает цену без указания валюты
 * @param {string} text
 * @returns {*}
 */
export function cleanPrice(text) {
  return parseInt(text.replace(/[^0-9]/g, ''));
}

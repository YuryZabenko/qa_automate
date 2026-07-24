export function getRandomIndex(length, skipFirst = false) {
  if (skipFirst) {
    const newLength = length - 1;
    return Math.floor(Math.random() * newLength) + 1;
  }
  return Math.floor(Math.random() * length);
}

export function getRandomString(length = 8, data = 'all') {
  let result = '';
  let chars = '';
  if (data === 'number') {
    chars = '0123456789'
  } else if (data === 'string') {
    chars = 'abcdefghijklmnopqrstuvwxyz'
  } else {
    chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  }
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getRandomEmail(domain = `test${Date.now()}.com`) {
  const username = getRandomString(10, 'string');
  return `${username}@${domain}`;
}

export async function addBlock(page) {
  await page.route('**/*', (route) => {
    const url = route.request().url();
    const blocklist = [
      'google-analytics.com',
      'googletagmanager.com',
      'doubleclick.net'
    ];

    if (blocklist.some(domain => url.includes(domain))) {
      return route.abort();
    }
    return route.continue();
  });
}

// export function getRandom(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
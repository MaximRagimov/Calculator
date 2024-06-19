const operations = {
    '+': { precedence: 1 },
    '-': { precedence: 1 },
    '*': { precedence: 2 },
    '/': { precedence: 2 },
    '%': { precedence: 2 }, // добавляем операцию взятия остатка от деления
    'u+': { precedence: 3 }, // унарный плюс
    'u-': { precedence: 3 }, // унарный минус
};

module.exports = operations;
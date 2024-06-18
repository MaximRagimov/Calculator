class Parser {
    parse(expression) {
        const tokens = [];
        let numberBuffer = '';

        for (let char of expression) {
            if (/\d|\./.test(char)) {
                numberBuffer += char;
            } else if (/[+\-*/()]/.test(char)) {
                if (numberBuffer) {
                    tokens.push(numberBuffer);
                    numberBuffer = '';
                }
                tokens.push(char);
            } else if (char.trim() === '') {
                continue; // игнорируем пробелы
            } else {
                throw new Error(`Invalid character: ${char}`);
            }
        }

        if (numberBuffer) {
            tokens.push(numberBuffer);
        }

        return tokens;
    }
}

module.exports = Parser;
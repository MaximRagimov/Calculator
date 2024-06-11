class Parser {
    parse(expression) {
        const tokens = [];
        let numberBuffer = '';

        for (let char of expression) {
            if (/\d|\./.test(char)) {
                numberBuffer += char;
            } else {
                if (numberBuffer) {
                    tokens.push(numberBuffer);
                    numberBuffer = '';
                }
                if (/[+\-*/()]/.test(char)) {
                    tokens.push(char);
                }
            }
        }

        if (numberBuffer) {
            tokens.push(numberBuffer);
        }

        return tokens;
    }
}

module.exports = Parser;
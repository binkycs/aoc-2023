import input from './input.txt';

interface Digit {
  value: number;
  index: number;
}

const wordExpressions: RegExp[] = [
  /one/gi,
  /two/gi,
  /three/gi,
  /four/gi,
  /five/gi,
  /six/gi,
  /seven/gi,
  /eight/gi,
  /nine/gi,
];

const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function run() {
  const values: number[] = [];

  input.split('\n').forEach((obj) => values.push(getNumbers(obj)));

  console.log(
    'Day 1: ',
    values.reduce((a, b) => a + b)
  );
}

function getNumbers(line: string) {
  const numbers: Digit[] = [];

  numbers.push(...getWordNumbers(line));
  numbers.push(...getDigitNumbers(line));

  numbers.sort((a, b) => a.index - b.index);

  const first = numbers[0].value;
  const last = numbers[numbers.length - 1].value;

  return +`${first}${last}`;
}

function getWordNumbers(line: string) {
  const numbers: Digit[] = [];

  wordExpressions.forEach((x, i) => {
    const matches = [...line.matchAll(x)].map((x) => ({
      value: digits[i],
      index: x.index,
    }));

    numbers.push(...matches);
  });

  return numbers;
}

function getDigitNumbers(line: string) {
  const numbers: Digit[] = [];

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const parsedInt = Number.parseInt(char);

    if (!Number.isNaN(parsedInt)) {
      numbers.push({ value: parsedInt, index: i });
    }
  }

  return numbers;
}

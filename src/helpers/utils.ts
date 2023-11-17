export function getRandomNumbers(min: number, max: number, count: number): number[] {
  const randomNumbers: number[] = [];
  for (let i = 0; i < count; i++) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.push(randomNum);
  }
  return randomNumbers;
}

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

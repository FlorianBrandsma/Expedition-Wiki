export default function NumberToAlphabet(number: number): string {
  
  if (number < 0) return '';

  let s = '';

  while (number > 0) {
    s = String.fromCharCode(65 + (number % 26)) + s;
    number = Math.floor(number / 26) - 1;
  }

  return s;
}
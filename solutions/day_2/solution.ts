const input_file = await Bun.file(`${import.meta.dir}/input.txt`).text()
const input_parsed: Array<[number, number]> = input_file.split(",")
  .map((range) => range.split("-").map(Number) as [number, number])

// Source - https://stackoverflow.com/a
// Posted by nkitku, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-02, License - CC BY-SA 4.0
const range = (from: number, to: number, step: number = 1) =>
  [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);

let fake_id_sum = 0
for (const range_bounds of input_parsed) {
  for (const num of range(range_bounds[0], range_bounds[1])) {
    const str_repr = String(num)
    if (str_repr.length % 2 != 0) {
      continue
    }
    const start = str_repr.slice(0, (str_repr.length / 2))
    const finish = str_repr.slice((str_repr.length / 2))
    if (start == finish) {
      fake_id_sum += num
    }
  }
}

console.log(`Answer (part 1): ${fake_id_sum}`)

// GCD implementation - courtesy of https://douglasmoura.dev/en-US/finding-the-greatest-common-divisor-in-typescript
const gcd = (...numbers: number[]): number => {
  if (numbers.length < 2) {
    throw new Error("You must pass, at least, 2 numbers")
  }

  if (numbers.some((number) => number < 0)) {
    throw new Error("The numbers must be >= 0")
  }

  const calculateGcd = (a: number, b: number): number => {
    if (b === 0) {
      return a
    }

    return calculateGcd(b, a % b);
  };

  return (
    numbers
      .sort((a, b) => b - a)
      .reduce((a, b) => calculateGcd(a, b))
  )
}

const count_digits = (input: string) => {
  let counts: Map<string, number> = new Map()
  for (const char of input) {
    if (counts.has(char)) {
      counts.set(char, counts.get(char)! + 1)
    }
    else {
      counts.set(char, 1)
    }
  }
  return counts
}

let fake_id_sum_part2 = 0
for (const range_bounds of input_parsed) {
  for (const num of range(range_bounds[0], range_bounds[1])) {
    if (num < 10) continue
    const str_repr = String(num)
    // count digits of the number
    const counts = count_digits(str_repr)
    if (counts.size == 1) {
      fake_id_sum_part2 += num
      continue
    }
    // calculate gcd of digit counts to figure out number of splits (if there are splits)
    const splits_number = gcd(...counts.values())
    if (splits_number == 1) {
      continue
    }
    // make those splits and check if they are the same
    const split_size = str_repr.length / splits_number
    let splits: Array<string> = [];
    for (let i = 0; i < splits_number; i++) {
      splits.push(str_repr.slice(i * split_size, (i + 1) * split_size))
    }
    if ((new Set(splits)).size == 1) {
      fake_id_sum_part2 += num
    }
  }
}

console.log(`Answer (part 2): ${fake_id_sum_part2}`)

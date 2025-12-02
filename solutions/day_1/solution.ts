const starting_point = 50
const total_steps = 100

const input_file = await Bun.file(`${import.meta.dir}/input.txt`).text()

const input_array: Array<string> = input_file.split('\n').slice(0, -1)

const next_step_part1 = (current: number, input: string): number => {
  const direction = input[0] === 'R' ? 1 : -1
  const step_number = Number(input.slice(1))
  if (direction == 1) {
    return (current + step_number) % total_steps
  }
  else {
    const result = total_steps - (((total_steps - current) + step_number) % total_steps)
    // corner-case when we go left by the same number of steps as current position
    return result == 100 ? 0 : result
  }
}

const output_array: Array<number> = []
let position = starting_point
for (const idx in input_array) {
  position = next_step_part1(position, input_array[idx]!)
  output_array[idx] = position
}

console.log(`Answer (Part 1): ${output_array.filter((x) => x == 0).length}`)

const next_step_part2 = (current: number, input: string): [number, number] => {
  const direction = input[0] === 'R' ? 1 : -1
  const step_number = Number(input.slice(1))
  if (step_number == 0) {
    return [current, 0]
  }
  if (direction == 1) {
    return [
      (current + step_number) % total_steps,
      Math.floor((current + step_number) / total_steps)
    ]
  }
  else {
    const position = total_steps - (((total_steps - current) + step_number) % total_steps)
    let cycles = Math.floor(((total_steps - current) + step_number) / total_steps)
    // corner-case when we go left from zero position it counts as two separate cycles
    if (current == 0) {
      cycles -= 1
    }
    // corner-case when we go left by the same number of steps as current position
    return position == 100 ? [0, cycles] : [position, cycles]
  }
}


const output_array_part2: Array<[number, number]> = []
let position_part2: [number, number] = [starting_point, 0]
for (const idx in input_array) {
  position_part2 = next_step_part2(position_part2[0], input_array[idx]!)
  output_array_part2[idx as unknown as number] = position_part2
}

const result_part2 = output_array_part2.map((x) => x[1]).reduce((sum, p) => sum + p)
console.log(`Answer (Part 2): ${result_part2}`)

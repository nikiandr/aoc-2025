const starting_point = 50
const total_steps = 100

const input_file = await Bun.file(`${import.meta.dir}/input.txt`).text()

const input_array: Array<string> = input_file.split('\n').slice(0, -1)

const next_step = (current: number, input: string): number => {
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
let prev_position
for (const idx in input_array) {
  prev_position = position
  position = next_step(position, input_array[idx]!)
  output_array[idx] = position
  console.log(`${prev_position} -> ${input_array[idx]!} -> ${position}`)
}

console.log(`Answer: ${output_array.filter((x) => x == 0).length}`)

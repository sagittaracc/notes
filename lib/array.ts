export const range = ({count, startWith}: {count: number, startWith: number}): Array<number> => {
  return [...Array(count).keys()].map(n => n + startWith);
}
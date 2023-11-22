import { useState, useEffect } from 'react';

export function useFilter(input: string, Items: string, array: object[]) {
  const [filterResult, setFilterResult] = useState<object[]>([]);

  useEffect(() => {
    const lowerInput = input.toLowerCase();
    const result = array.filter((item) => {
      const itemValue = item[Items].toLowerCase();
      return itemValue.includes(lowerInput);
    });

    setFilterResult(result);
  }, [input, array, Items]);

  return filterResult;
}

export function optionFilter(
  column: string,
  operator: string,
  value: number,
  array: object[],
) {
  const [filterResult, setFilterResult] = useState<object[]>([]);

  useEffect(() => {
    const result = array.filter((items) => {
      const itemValue = items[column];
      const num = Number(value);

      switch (operator) {
        case 'menor que':
          return itemValue < num;
        case 'maior que':
          return itemValue > num;
        case 'igual a':
          return itemValue === value;
        default:
          return true;
      }
    });
    console.log(result);
    setFilterResult(result);
  }, [column, operator, value, array]);

  return filterResult;
}

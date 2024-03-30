export const createNumbersArray = (from, to) => {
  // ф-ция должна генерировать массив чисел от from до to
  const arrOfNum = [];
  for(let i = from; i <= to; i += 1){
    arrOfNum.push(i);
  }
  return arrOfNum;
};

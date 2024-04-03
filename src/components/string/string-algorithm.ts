export const getReversingStringSteps = (sourceString: string): string[][] => {
  const sourceStringLetters = sourceString.split('');
  const steps = [[...sourceStringLetters]];

  if(sourceString.length <= 1) {
    return [[...sourceStringLetters]];
  };

  const maxIterationCount = Math.ceil((sourceString.length - 1) / 2);

  for(
    let leftPosition = 0;
    leftPosition < maxIterationCount;
    ++leftPosition
  ) {
    const rightPosition = sourceString.length - 1 - leftPosition;

    sourceStringLetters[rightPosition] = sourceString[leftPosition];
    sourceStringLetters[leftPosition] = sourceString[rightPosition];

    steps.push([...sourceStringLetters]);
  }

  console.log(steps);

  return steps;
}
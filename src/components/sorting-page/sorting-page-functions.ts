import { Direction } from "../../types/direction";
import { Step } from "../../types/step";

export const randomArr = () => {
    const minLen = 3;
    const maxLen = 17;

    const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    const arr = Array.from({length}, ():number => ( Math.floor(Math.random() * 101)));

    return arr;
}


export const getSelectionSortSteps = (sourceArray: number[], direction: Direction): Step[] => {
    const steps: Step[] = [];

    for(let i = 0, l = sourceArray.length, k = l - 1; i < k; i++) {
        let indexMin = i;

        for(let j = i + 1; j < l; j++) {
            steps.push({
                currentArray: [...sourceArray],
                aIndex: i,
                bIndex: j,
                sortedIndexes: [...(steps[steps.length - 1]?.sortedIndexes || [])],
            });

            if(direction === Direction.Ascending
                ? sourceArray[indexMin] > sourceArray[j]
                : sourceArray[indexMin] < sourceArray[j]
            ) {
                indexMin = j;
            }
        }

        if(indexMin !== i) {
            [sourceArray[i], sourceArray[indexMin]] = [
                sourceArray[indexMin],
                sourceArray[i]
            ]
        }

        steps[steps.length - 1].sortedIndexes.push(i);
    }

    steps.push({
        currentArray: [...sourceArray],
        sortedIndexes: steps[steps.length - 1]?.sortedIndexes || [],
    })

    return steps
}

export const getBubbleSortSteps = (sourceArray: number[], direction: Direction): Step[] => {
    const steps: Step[] = [];
    let isElementSwapped;
    let iterationNumber = 0;

    do {
        isElementSwapped = false;

        for(let i = 0; i < sourceArray.length - 1 - iterationNumber; i++) {
            if(direction === Direction.Ascending
                ? sourceArray[i] > sourceArray[i + 1]
                : sourceArray[i] < sourceArray[i + 1]
            ) {
                let tmp = sourceArray[i];
                sourceArray[i] = sourceArray[i + 1];
                sourceArray[i + 1] = tmp;
                isElementSwapped = true;
            }
            steps.push({
                currentArray: [...sourceArray],
                aIndex: i,
                bIndex: i + 1,
                sortedIndexes: [...(steps[steps.length - 1]?.sortedIndexes || [])],
            });
        }
        steps[steps.length - 1]?.sortedIndexes.push(
            sourceArray.length - ++iterationNumber
        );
    } while (isElementSwapped);

    steps.push({
        currentArray: [...sourceArray],
        sortedIndexes: steps[steps.length - 1]?.sortedIndexes || [],
    });

    console.log(steps);

    return steps
}
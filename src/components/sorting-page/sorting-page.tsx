import React, { useEffect, useRef, useState } from "react";
import styles from './sorting-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { randomArr, getBubbleSortSteps, getSelectionSortSteps } from "./sorting-page-functions";
import { Column } from "../ui/column/column";
import { bubbleSort, selectionSort } from "../../constants/selection";
import { ElementStates } from "../../types/element-states";
import { Step } from "../../types/step";
import { delay } from "../../utils/functions/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";


export type LoadingAnim = {
  selectAscLoading: boolean,
  selectDescLoading: boolean
}

export const SortingPage: React.FC = () => {

  const randomArray = useRef<number[]>(randomArr());
  const [arr, setArr] = useState<number[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [sortMethod, setSortMethod] = useState(selectionSort);
  const [sortDirection, setSortDirection] = useState<Direction>();
  const [isLoadingAnim, setLoadingAnim] = useState<LoadingAnim>({
    selectAscLoading: false,
    selectDescLoading: false
  });
  const [algorithmSteps, setAlgorithmSteps] = useState<Step[]>([]);
  const [currentAlgorithmStep, setCurrentAlgorithmStep] = useState(0);

  const createArr = () => {
    randomArray.current = randomArr();
    setAlgorithmSteps([{
      currentArray: randomArray.current,
      sortedIndexes: []
    }]);
    setCurrentAlgorithmStep(0);
  }

  const changeSortMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortMethod(e.target.value);
  }

  const sort = async (sortDirection: Direction) => {
    setLoading(true);

    if(sortMethod === bubbleSort) {
      if(sortDirection === Direction.Ascending) {
        setLoadingAnim({
          selectAscLoading: true,
          selectDescLoading: false
        });
        const sortSteps = getBubbleSortSteps(randomArray.current, sortDirection);

        setAlgorithmSteps(sortSteps);
        setSortDirection(sortDirection);
        setCurrentAlgorithmStep(0);

        for(let i = 0; i < sortSteps.length - 1; i++) {
          randomArray.current = sortSteps[sortSteps.length - 1].currentArray;
          await delay(SHORT_DELAY_IN_MS);
          setCurrentAlgorithmStep(currentAlgorithmStep => currentAlgorithmStep + 1);
        }
      } else {
        setLoadingAnim({
          selectAscLoading: false,
          selectDescLoading: true
        });
        const sortSteps = getBubbleSortSteps(randomArray.current, sortDirection);

        setAlgorithmSteps(sortSteps);
        setSortDirection(sortDirection);
        setCurrentAlgorithmStep(0);

        for(let i = 0; i < sortSteps.length - 1; i++) {
          randomArray.current = sortSteps[sortSteps.length - 1].currentArray;
          await delay(SHORT_DELAY_IN_MS);
          setCurrentAlgorithmStep(currentAlgorithmStep => currentAlgorithmStep + 1);
        }
      }
    } else {
      if(sortDirection === Direction.Ascending) {
        setLoadingAnim({
          selectAscLoading: true,
          selectDescLoading: false
        });
        const sortSteps = getSelectionSortSteps(randomArray.current, sortDirection);

        setAlgorithmSteps(sortSteps);
        setSortDirection(sortDirection);
        setCurrentAlgorithmStep(0);

        for(let i = 0; i < sortSteps.length - 1; i++) {
          randomArray.current = sortSteps[sortSteps.length - 1].currentArray;
          await delay(SHORT_DELAY_IN_MS);
          setCurrentAlgorithmStep(currentAlgorithmStep => currentAlgorithmStep + 1);
        }
      } else {
        setLoadingAnim({
          selectAscLoading: false,
          selectDescLoading: true
        });
        const sortSteps = getSelectionSortSteps(randomArray.current, sortDirection);

        setAlgorithmSteps(sortSteps);
        setSortDirection(sortDirection);
        setCurrentAlgorithmStep(0);

        for(let i = 0; i < sortSteps.length - 1; i++) {
          randomArray.current = sortSteps[sortSteps.length - 1].currentArray;
          await delay(SHORT_DELAY_IN_MS);
          setCurrentAlgorithmStep(currentAlgorithmStep => currentAlgorithmStep + 1);
        }
      }
    }

    setLoading(false);
    setLoadingAnim({
      selectAscLoading: false,
      selectDescLoading: false
    })

  }

  useEffect(() => {
    createArr();
  }, []);

  const getColumnState = (index: number, maxIndex: number, currentStepNumber: number, currentStep: Step) => {
    if([currentStep.aIndex, currentStep.bIndex].includes(index)) {
      return ElementStates.Changing;
    }

    if(currentStep.sortedIndexes.includes(index) || (currentStepNumber === maxIndex && maxIndex > 0)) {
      return ElementStates.Modified;
    }

    return ElementStates.Default;
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div data-cy="sorting-page" className={styles.container}>
        <div className={styles.input__container}>
          <RadioInput label={selectionSort} value={selectionSort} checked={sortMethod === selectionSort ? true : false} onChange={changeSortMethod} disabled={isLoading} />
          <RadioInput label={bubbleSort} value={bubbleSort} checked={sortMethod === bubbleSort ? true : false} onChange={changeSortMethod} disabled={isLoading} />
        </div>
        <div className={styles.btn__container}>
          <Button sorting={Direction.Ascending} isLoader={isLoadingAnim.selectAscLoading} text="По возрастанию" disabled={isLoading} onClick={() => sort(Direction.Ascending)} />
          <Button sorting={Direction.Descending} isLoader={isLoadingAnim.selectDescLoading} text="По убыванию" disabled={isLoading}  onClick={() => sort(Direction.Descending)} />
        </div>
        <Button text="Новый массив" onClick={createArr} disabled={isLoading}  />
      </div>
      <div className={styles.column__container}>
        {algorithmSteps.length !== 0 && algorithmSteps[currentAlgorithmStep].currentArray.map((column, index) => (
          <Column key={index} index={column} state={getColumnState(index, algorithmSteps.length - 1, currentAlgorithmStep, algorithmSteps[currentAlgorithmStep])}/>
        ))}
      </div>
    </SolutionLayout>
  );
};

import React, { useEffect, useState } from "react";
import styles from './sorting-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { bubbleSortAsc, bubbleSortDesc, randomArr, selectionSortAsc, selectionSortDesc } from "./sorting-page-functions";
import { Column } from "../ui/column/column";
import { bubbleSort, selectionSort } from "../../constants/selection";
import { ColumnObj } from "../../types/column-obj";

export type LoadingAnim = {
  selectAscLoading: boolean,
  selectDescLoading: boolean
}

export const SortingPage: React.FC = () => {

  const [arr, setArr] = useState<ColumnObj[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [sortMethod, setSortMethod] = useState(selectionSort);
  const [isLoadingAnim, setLoadingAnim] = useState<LoadingAnim>({
    selectAscLoading: false,
    selectDescLoading: false
  });

  const createArr = () => {
    setArr(randomArr());
  }

  const changeSortMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortMethod(e.target.value);
  }

  const sort = (sortDirection: Direction) => {
    if(sortMethod === bubbleSort) {
      if(sortDirection === Direction.Ascending) {
        bubbleSortAsc(arr, setArr, setLoading, setLoadingAnim);
      } else {
        bubbleSortDesc(arr, setArr, setLoading, setLoadingAnim);
      }
    } else {
      if(sortDirection === Direction.Ascending) {
        selectionSortAsc(arr, setArr, setLoading, setLoadingAnim);
      } else {
        selectionSortDesc(arr, setArr, setLoading, setLoadingAnim);
      }
    }
  }

  useEffect(() => {
    createArr();
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
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
        {arr.map((column, index) => (
          <Column key={index} index={column.number} state={column.state}/>
        ))}
      </div>
    </SolutionLayout>
  );
};

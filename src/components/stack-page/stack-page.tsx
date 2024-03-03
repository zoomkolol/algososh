import React, { useState } from "react";
import styles from './stack-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../hooks/useForm";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "./stack-page-functions";
import { LetterObj } from "../../types/letter-obj";

export const StackPage: React.FC = () => {

  const {values, handleChange, setValues} = useForm({
    value: ''
  });
  const [isLoading, setLoading] = useState(false);
  const [arr, setArr] = useState<LetterObj[]>([]);
  const [stack] = useState(new Stack<LetterObj>());

  const click = () => {
    console.log(stack.peak());
  }

  const add = () => {
    setLoading(true);
    if(values.value) {
      stack.push({letter: values.value, state: ElementStates.Default});
      setValues({value: ''}); 

      setTimeout(() => {
        const updateStack = stack.container.map((item, index) => ({
          ...item,
          state: index === stack.container.length - 1 ? ElementStates.Changing : ElementStates.Default
        }));
        setArr(updateStack);
      }, SHORT_DELAY_IN_MS);
      setLoading(false);
    }
  }

  const remove = () => {
    setLoading(true);
    setTimeout(() => {
      stack.pop()
      const updateStack = stack.container.map((item, index) => ({
        ...item,
        state: index === stack.container.length - 1 ? ElementStates.Changing : ElementStates.Default
      }))
      setArr(updateStack);
    }, SHORT_DELAY_IN_MS);
    setLoading(false);
  }

  const onClickClear = () => {
    stack.clear();
    setValues({value: ''}); 
    setArr([]);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <div className={styles.container__main}>
         <Input maxLength={4} isLimitText={true} name="value" onChange={handleChange} disabled={isLoading}/>
         <Button text="Добавить" isLoader={isLoading} onClick={add}/>
         <Button text="Удалить" isLoader={isLoading} onClick={remove}/>
        </div>
        <Button text="Очистить" isLoader={isLoading} onClick={onClickClear}/>
      </div>
      <div className={styles.circles__container}>
        {arr.map((item, index) => (
          <Circle letter={item.letter} key={index} index={index} state={item.state} head={index === arr.length - 1 ? 'top' : ''} />
        ))}
      </div>
    </SolutionLayout>
  );
};

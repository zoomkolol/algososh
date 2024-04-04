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
  const [isLoadingAnim, setLoadingAnim] = useState({
    add: false,
    remove: false
  });

  const [arr, setArr] = useState<LetterObj[]>([]);
  const [stack] = useState(new Stack<LetterObj>());

  const add = () => {
    setLoading(true);
    setLoadingAnim({
      add: true,
      remove: false
    });
    if(values.value) {
      stack.push({letter: values.value, state: ElementStates.Default});
      setValues({value: ''}); 

      setTimeout(() => {
        const updateStack = stack.container.map((item, index) => ({
          ...item,
          state: index === stack.container.length - 1 ? ElementStates.Changing : ElementStates.Default
        }));
        setArr(updateStack);
        setLoading(false);
        setLoadingAnim({
          add: false,
          remove: false
        });
      }, SHORT_DELAY_IN_MS);
      
    }
  }

  const remove = () => {
    setLoading(true);
    setLoadingAnim({
      add: false,
      remove: true
    })
    setTimeout(() => {
      stack.pop()
      const updateStack = stack.container.map((item, index) => ({
        ...item,
        state: index === stack.container.length - 1 ? ElementStates.Changing : ElementStates.Default
      }))
      setArr(updateStack);
      setLoading(false);
      setLoadingAnim({
        add: false,
        remove: false
      });
    }, SHORT_DELAY_IN_MS);
    
  }

  const onClickClear = () => {
    stack.clear();
    setValues({value: ''}); 
    setArr([]);
  }

  return (
    <SolutionLayout title="Стек">
      <div data-cy="stack-page" className={styles.container}>
        <div className={styles.container__main}>
         <Input maxLength={4} isLimitText={true} name="value" value={values.value} onChange={handleChange} disabled={isLoading}/>
         <Button data-cy='btn-add' text="Добавить" isLoader={isLoadingAnim.add} onClick={add} disabled={!values.value}/>
         <Button data-cy='btn-delete' text="Удалить" isLoader={isLoadingAnim.remove} disabled={isLoading || arr.length < 1 ? true : false} onClick={remove}/>
        </div>
        <Button data-cy='btn-clear' text="Очистить" disabled={isLoading || arr.length < 1 ? true : false} onClick={onClickClear}/>
      </div>
      <div className={styles.circles__container}>
        {arr.map((item, index) => (
          <Circle letter={item.letter} key={index} index={index} state={item.state} head={index === arr.length - 1 ? 'top' : ''} />
        ))}
      </div>
    </SolutionLayout>
  );
};

import React, { useState } from "react";
import styles from '../stack-page/stack-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/useForm";
import { LetterObj } from "../../types/letter-obj";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Queue } from "./queueue-page-functions";

export const QueuePage: React.FC = () => {

  const {values, handleChange, setValues} = useForm({
    value: ''
  });
  const [isLoading, setLoading] = useState(false);

  const emptyArr = Array.from({length: 7}, () => ({
    letter: '',
    state: ElementStates.Default
  }));
  const [arr, setArr] = useState<LetterObj[]>(emptyArr);
  const [queue] = useState(new Queue<LetterObj>(7));

  const click = () => {
    console.log(queue.peak());
  }

  const add = () => {
    setLoading(true);
    if(values.value) {
      queue.enqueue({letter: values.value, state: ElementStates.Default});

      arr[queue.getTail() - 1] = {
        letter: values.value,
        state: ElementStates.Changing
      };
      setArr([...arr]);

      setTimeout(() => {
        arr[queue.getTail() - 1] = {
          letter: values.value ? values.value : '',
          state: ElementStates.Default
        };
        setArr([...arr]);
        setLoading(false);
      }, SHORT_DELAY_IN_MS);
    }
  }

  const remove = () => {
    setLoading(true);
    if(!queue.isEmpty()) {
      const head = queue.getHead();
      arr[head] = {
        ...arr[head],
        state: ElementStates.Changing
      }
      setArr([...arr]);

      setTimeout(() => {
        queue.dequeue();
        console.log(queue);
        arr[queue.getHead() - 1] = {
          letter: '', 
          state: ElementStates.Default
        };
        setArr([...arr]);
        setLoading(false);
      }, SHORT_DELAY_IN_MS);
    } else {
      setLoading(false);
    }
  }

  const onClickClear = () => {
    queue.clear();
    setValues({value: ''}); 
    setArr(emptyArr);
  }

  return (
    <SolutionLayout title="Очередь">
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
          <Circle letter={item.letter} key={index} index={index} state={item.state} head={index === queue.getHead() && !queue.isEmpty() ? 'head' : ''} tail={index === queue.getTail() - 1 ? 'tail' : ''} />
        ))}
      </div>
    </SolutionLayout>
  );
};

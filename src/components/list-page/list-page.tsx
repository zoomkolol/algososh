import React, { useState } from "react";
import styles from './list-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./list-page-functions";
import { useForm } from "../../hooks/useForm";


//TODO: СРОЧНО ДОДЕЛАТЬ АНИМАЦИЮ!
export const ListPage: React.FC = () => {

  const {values, handleChange, setValues} = useForm({
    value: '',
    index: ''
  });
  const [list] = useState(new LinkedList<string>())
  const [arr, setArr] = useState<string[]>([]);

  const updateArr = () => {
    setArr(list.toArray());
  }

  const resetValues = () => {
    setValues({value: '', index: ''});
    list.getList();
    console.log('Value: ' + values.value);
    console.log('Index: ' + values.index);
  }

  const addHead = () => {
    list.prepend(values.value ? values.value : '');
    updateArr();
    resetValues();
  }

  const addTail = () => {
    list.append(values.value ? values.value : '');
    updateArr();
    resetValues();
  }

  const removeHead = () => {
    list.removeHead();
    updateArr();
    resetValues();
  }

  const removeTail = () => {
    list.removeTail();
    updateArr();
    resetValues();
  }

  const addAtIndex = () => {
    const index = parseInt(values.index ?? '');
    if(!isNaN(index) && values.value) {
      list.addAtIndex(index, values.value);
      updateArr();
      resetValues();
    }
  }

  const removeAtIndex = () => {
    const index = parseInt(values.index ?? '');
    if(!isNaN(index)) {
      list.removeAtIndex(index);
      updateArr();
      resetValues();
    }
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.main__container}>
        <div className={styles.input__container}>
          <Input maxLength={4} isLimitText={true} name='value' value={values.value} onChange={handleChange}/>
        </div>
        <Button text='Добавить в head' onClick={addHead} disabled={values.value === '' ? true : false}/>
        <Button text='Добавить в tail' onClick={addTail} disabled={values.value === '' ? true : false}/>
        <Button text='Удалить из head' onClick={removeHead} disabled={arr.length < 1 ? true : false} />
        <Button text='Удалить из tail' onClick={removeTail} disabled={arr.length < 1 ? true : false} />
      </div>
      <div className={styles.main__container}>
        <div className={styles.input__container}>
          <Input name='index' value={values.index} onChange={handleChange}/>
        </div>
        <div className={styles.btn__container}>
        <Button text='Добавить по индексу' onClick={addAtIndex} disabled={!values.index || !values.value ? true : false}/>
        <Button text='Удалить по индексу' onClick={removeAtIndex} disabled={!values.index || arr.length < 1 ? true : false}/>
        </div>
      </div>
      <div className={styles.container}>
        {arr.map((element, index) => (
          <div className={styles.circle__container} key={index}>
            <Circle index={index} letter={element} head={index === 0 ? 'head' : ''} tail={index === arr.length - 1 ? 'tail' : ''}/>
            {index < arr.length - 1  && <ArrowIcon />}
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};

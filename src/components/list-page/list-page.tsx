import React, { useState } from "react";
import styles from './list-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./list-page-functions";
import { useForm } from "../../hooks/useForm";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";


//TODO: ДОДЕЛАТЬ АНИМАЦИЮ!
export const ListPage: React.FC = () => {

  const {values, handleChange, setValues} = useForm({
    value: '',
    index: ''
  });
  const [list] = useState(new LinkedList<string>())
  const [arr, setArr] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);

  const [isLoadingAnim, setLoadingAnim] = useState({
    addHead: false,
    addTail: false,
    removeHead: false,
    removeTail: false,
    addIndex: false,
    removeIndex: false
  });

  const updateArr = () => {
    setArr(list.toArray());
  }

  const resetValues = () => {
    setValues({value: '', index: ''});
    setLoading(false);
    list.getList();
    console.log('Value: ' + values.value);
    console.log('Index: ' + values.index);
  }

  const addHead = async () => {
    list.prepend(values.value ? values.value : '');
    setLoadingAnim(prevState => ({
      ...prevState,
      addHead: !prevState.addHead
    }));
    setLoading(true);
    await new Promise(res => setTimeout(res, SHORT_DELAY_IN_MS));
    updateArr();
    resetValues();
    setLoadingAnim(prevState => ({
      ...prevState,
      addHead: !prevState.addHead
    }));
  }

  const addTail = async () => {
    list.append(values.value ? values.value : '');
    setLoadingAnim(prevState => ({
      ...prevState,
      addTail: !prevState.addTail
    }));
    setLoading(true);
    await new Promise(res => setTimeout(res, SHORT_DELAY_IN_MS));
    updateArr();
    resetValues();
    setLoadingAnim(prevState => ({
      ...prevState,
      addTail: !prevState.addTail
    }));
  }

  const removeHead = async () => {
    list.removeHead();
    setLoadingAnim(prevState => ({
      ...prevState,
      removeHead: !prevState.removeHead
    }));
    setLoading(true);
    await new Promise(res => setTimeout(res, SHORT_DELAY_IN_MS));
    updateArr();
    resetValues();
    setLoadingAnim(prevState => ({
      ...prevState,
      removeHead: !prevState.removeHead
    }));
  }

  const removeTail = async () => {
    list.removeTail();
    setLoadingAnim(prevState => ({
      ...prevState,
      removeTail: !prevState.removeTail
    }));
    setLoading(true);
    await new Promise(res => setTimeout(res, SHORT_DELAY_IN_MS));
    updateArr();
    resetValues();
    setLoadingAnim(prevState => ({
      ...prevState,
      removeTail: !prevState.removeTail
    }));
  }

  const addAtIndex = async () => {
    const index = parseInt(values.index ?? '');
    setLoadingAnim(prevState => ({
      ...prevState,
      addIndex: !prevState.addIndex
    }));
    setLoading(true);
    await new Promise(res => setTimeout(res, SHORT_DELAY_IN_MS));
    if(!isNaN(index) && values.value) {
      list.addAtIndex(index, values.value);
      updateArr();
      resetValues();
      setLoadingAnim(prevState => ({
        ...prevState,
        addIndex: !prevState.addIndex
      }));
    }
  }

  const removeAtIndex = async () => {
    const index = parseInt(values.index ?? '');
    setLoadingAnim(prevState => ({
      ...prevState,
      removeIndex: !prevState.removeIndex
    }));
    setLoading(true);
    await new Promise(res => setTimeout(res, SHORT_DELAY_IN_MS));
    if(!isNaN(index)) {
      list.removeAtIndex(index);
      updateArr();
      resetValues();
      setLoadingAnim(prevState => ({
        ...prevState,
        removeIndex: !prevState.removeIndex
      }));
    }
  }

  return (
    <SolutionLayout title="Связный список">
      <div data-cy="list-page" className={styles.main__container}>
        <div className={styles.input__container}>
          <Input maxLength={4} isLimitText={true} name='value' value={values.value} onChange={handleChange} disabled={isLoading}/>
        </div>
        <Button data-cy="btn-add-head" text='Добавить в head' onClick={addHead} isLoader={isLoadingAnim.addHead} disabled={!values.value || isLoading || list.getLength() > 5}/>
        <Button data-cy="btn-add-tail" text='Добавить в tail' onClick={addTail} isLoader={isLoadingAnim.addTail} disabled={!values.value || isLoading || list.getLength() > 5}/>
        <Button data-cy="btn-delete-head" text='Удалить из head' onClick={removeHead} isLoader={isLoadingAnim.removeHead} disabled={arr.length < 1 ? true : false || isLoading} />
        <Button data-cy="btn-delete-tail" text='Удалить из tail' onClick={removeTail} isLoader={isLoadingAnim.removeTail} disabled={arr.length < 1 ? true : false || isLoading} />
      </div>
      <div className={styles.main__container}>
        <div className={styles.input__container}>
          <Input type="number" name='index' value={values.index} onChange={handleChange} disabled={isLoading}/>
        </div>
        <div className={styles.btn__container}>
        <Button data-cy="btn-add-index" text='Добавить по индексу' onClick={addAtIndex} isLoader={isLoadingAnim.addIndex} disabled={
          !values.index || 
          !values.value || 
          isLoading || 
          Number(values.index) < 0 || 
          Number(values.index) > list.getLength() ||
          list.getLength() > 5}/>
        <Button data-cy="btn-delete-index" text='Удалить по индексу' onClick={removeAtIndex} isLoader={isLoadingAnim.removeIndex} disabled={
          !values.index || 
          isLoading || 
          Number(values.index) < 0 || 
          Number(values.index) > list.getLength() - 1}/>
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

import React, { useState } from "react";
import { ElementStates } from "../../types/element-states";
import styles from './string.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { LetterObj } from "../../types/letter-obj";

export const StringComponent: React.FC = () => {

  const {values, handleChange, setValues} = useForm({
    value: ''
  });
  const [isLoading, setLoading] = useState(false);
  const [lettersArr, setLetterArr] = useState<LetterObj[]>([]);

  const onClick = () => {
    setLoading(true);
    setValues({value: ''});

    const letters: LetterObj[] = values.value?.split('').map(letter => ({
      letter: letter,
      state: ElementStates.Default
    })) ?? [];
    setLetterArr(letters);

    setTimeout(() => {
      const swap = (start: number, end: number) => {
        if(start < end) {
          letters[start].state = ElementStates.Changing;
          letters[end].state = ElementStates.Changing;
          setLetterArr([...letters]);

          setTimeout(() => {
            const temp = letters[start];
            letters[start] = letters[end];
            letters[end] = temp;
            letters[start].state = ElementStates.Modified;
            letters[end].state = ElementStates.Modified;
            setLetterArr([...letters]);
          }, DELAY_IN_MS);
  
          setTimeout(() => {
            swap(start + 1, end - 1);
          }, DELAY_IN_MS);
        } else {
          letters[start].state = ElementStates.Modified
          setLoading(false);
        }
      }
  
      swap(0, letters.length - 1);
    }, DELAY_IN_MS);   
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <Input isLimitText={true} maxLength={11} name="value" value={values.value} onChange={handleChange} disabled={isLoading}/>
        <Button text="Развернуть" onClick={onClick} isLoader={isLoading} disabled={!values.value}/>
      </div>
      <div className={styles.circles__container}>
        {lettersArr.map((letter, index) => (
          <Circle letter={letter.letter} key={index} state={letter.state}/>
        ))}
      </div>
    </SolutionLayout>
  );
};

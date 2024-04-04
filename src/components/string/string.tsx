import React, { useState } from "react";
import { ElementStates } from "../../types/element-states";
import styles from './string.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { getReversingStringSteps } from "./string-algorithm";
import { delay } from "../../utils/functions/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";


export const StringComponent: React.FC = () => {

  const {values, handleChange, setValues} = useForm({
    value: ''
  });
  const [isLoading, setLoading] = useState(false);
  const [lettersArr, setLetterArr] = useState<string[]>([]);

  const [currentStep, setCurrentStep] = useState(0);

  const onClick = async () => {
    setLoading(true);
    if(!values.value) return
    const steps = getReversingStringSteps(values.value);
    setCurrentStep(0);

    setValues({value: ''});

    for(let i = 0; i < steps.length; i++) {
      setLetterArr([...steps[i]]);
      await delay(SHORT_DELAY_IN_MS);
      setCurrentStep(currentStep => currentStep + 1);
    }

    setLoading(false);
  }

  const getLetterState = (index: number, maxIndex: number) => {
    return (index < currentStep || index > maxIndex - currentStep) ? ElementStates.Modified
          : (index === currentStep || index === maxIndex - currentStep) ? ElementStates.Changing
          : ElementStates.Default
  }

  return (
    <SolutionLayout title="Строка">
      <div data-cy="recursion-page" className={styles.container}>
        <Input isLimitText={true} maxLength={11} name="value" value={values.value} onChange={handleChange} disabled={isLoading}/>
        <Button data-cy="submit" text="Развернуть" onClick={onClick} isLoader={isLoading} disabled={!values.value}/>
      </div>
      <div className={styles.circles__container}>
        {lettersArr.map((letter, index) => (
          <Circle letter={letter} key={index} state={getLetterState(index, lettersArr.length - 1)}/>
        ))}
      </div>
    </SolutionLayout>
  );
};

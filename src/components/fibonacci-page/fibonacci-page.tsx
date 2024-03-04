import React, { useState } from "react";
import styles from './fibonacci-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/useForm";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {

  const {values, handleChange, setValues} = useForm({
    value: ''
  });

  const [isLoading, setLoading] = useState(false);
  const [fibonacciArr, setFibonacciArr] = useState<string[]>([]);

  const fibonacci = (n: number): number => {
    return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
  }

  const updateFibonacci = (n: number, index = 1) => {
    if(index > n + 1) {
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setFibonacciArr((prevArr) => [...prevArr, fibonacci(index).toString()]);
      updateFibonacci(n, index + 1);
    }, SHORT_DELAY_IN_MS);
  }

  const onClick = () => {
    setFibonacciArr([]);
    setLoading(true);
    updateFibonacci(Number(values.value));
    setValues({value: ''});
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <Input min={1} max={19} type="number" isLimitText={true} name="value" value={values.value} onChange={handleChange} disabled={isLoading}/>
        <Button text="Рассчитать" onClick={onClick} disabled={values.value === '' || Number(values.value) < 1 || Number(values.value) > 19 } isLoader={isLoading} />
      </div>
      <div className={styles.circles__container}>
        {fibonacciArr.map((number, index) => (
          <Circle key={index} index={index} letter={number}/>
        ))}
      </div>
    </SolutionLayout>
  );
};

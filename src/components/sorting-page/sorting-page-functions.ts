import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ColumnObj } from "../../types/column-obj";
import { ElementStates } from "../../types/element-states";
import { LoadingAnim } from "./sorting-page";

export const randomArr = () => {
    const minLen = 3;
    const maxLen = 17;

    const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    const arr = Array.from({length}, ():ColumnObj => ({
        number: Math.floor(Math.random() * 101),
        state: ElementStates.Default
    }));

    return arr;
}

const swap = (arr: ColumnObj[], j: number, o: number) => {
    let temp = arr[j];
    arr[j] = arr[o];
    arr[o] = temp;
}

export const bubbleSortAsc = (arr: ColumnObj[], updateArr: React.Dispatch<React.SetStateAction<ColumnObj[]>>, setLoading:  React.Dispatch<React.SetStateAction<boolean>>, setLoadingAnim: React.Dispatch<React.SetStateAction<LoadingAnim>>) => {
    setLoading(true);
    setLoadingAnim({
        selectAscLoading: true,
        selectDescLoading: false
    })

    let i = 0;
    let j = 0;

    const length = arr.length;

    const swapElements = () => {
        if(i < length - 1) {
            if(j < length - i - 1) {
                arr[j].state = ElementStates.Changing;
                arr[j + 1].state = ElementStates.Changing;

                updateArr([...arr]);

                setTimeout(() => {
                    if(arr[j].number > arr[j + 1].number) {
                        swap(arr, j, j + 1);
                    }

                    arr[j].state = ElementStates.Default;

                    if(j === length - i - 2) {
                        arr[j + 1].state = ElementStates.Default;
                    }

                    j++;

                    if(j >= length - i - 1) {
                        arr[length - i - 1].state = ElementStates.Modified;
                        j = 0;
                        i++
                    }

                    updateArr([...arr]);

                    if(i < length) {
                        swapElements();
                    } else {
                        setLoading(false);
                    }
                }, SHORT_DELAY_IN_MS);
            }
        } else {
            arr[0].state = ElementStates.Modified;
            updateArr([...arr]);
            setLoading(false);
            setLoadingAnim({
                selectAscLoading: false,
                selectDescLoading: false
            })
        }
    }

    swapElements();
}

export const bubbleSortDesc = (arr: ColumnObj[], updateArr: React.Dispatch<React.SetStateAction<ColumnObj[]>>, setLoading:  React.Dispatch<React.SetStateAction<boolean>>, setLoadingAnim: React.Dispatch<React.SetStateAction<LoadingAnim>>) => {
    setLoading(true);
    setLoadingAnim({
        selectAscLoading: false,
        selectDescLoading: true
    })

    let i = 0;
    let j = 0;

    const length = arr.length;

    const swapElements = () => {
        if(i < length - 1) {
            if(j < length - i - 1) {
                arr[j].state = ElementStates.Changing;
                arr[j + 1].state = ElementStates.Changing;

                updateArr([...arr]);

                setTimeout(() => {
                    if(arr[j].number < arr[j + 1].number) {
                        swap(arr, j, j + 1);
                    }

                    arr[j].state = ElementStates.Default;

                    if(j === length - i - 2) {
                        arr[j + 1].state = ElementStates.Default;
                    }

                    j++;

                    if(j >= length - i - 1) {
                        arr[length - i - 1].state = ElementStates.Modified;
                        j = 0;
                        i++
                    }

                    updateArr([...arr]);

                    if(i < length) {
                        swapElements();
                    } else {
                        setLoading(false);
                    }
                }, SHORT_DELAY_IN_MS);
            }
        } else {
            arr[0].state = ElementStates.Modified;
            updateArr([...arr]);
            setLoading(false);
            setLoadingAnim({
                selectAscLoading: false,
                selectDescLoading: false
            })
        }
    }

    swapElements();
}

export const selectionSortAsc = (arr: ColumnObj[], updateArr: React.Dispatch<React.SetStateAction<ColumnObj[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setLoadingAnim: React.Dispatch<React.SetStateAction<LoadingAnim>>) => {
    setLoading(true);
    setLoadingAnim({
        selectAscLoading: true,
        selectDescLoading: false
    })
    const length = arr.length;

    let i = 0;
    let j = i + 1;
    let min = i;

    const selectionSort = () => {
        if (i < length - 1) {
            if (j < length) {
                arr[j].state = ElementStates.Changing;
                if(min !== i) {
                    arr[min].state = ElementStates.Changing;
                    updateArr([...arr]);
                }

                updateArr([...arr]);
                
                setTimeout(() => {
                    if (min !== j) {
                        arr[j].state = ElementStates.Default;
                    }

                    if (arr[j].number < arr[min].number) {
                        if (min !== i) {
                            arr[min].state = ElementStates.Default;
                        }
                        min = j;
                    }

                    j++;

                    selectionSort();
                }, SHORT_DELAY_IN_MS);
            } else {
                if (min !== i) {
                    swap(arr, i, min);
                    arr[i].state = ElementStates.Modified;
                    arr[min].state = ElementStates.Default; 
                } else {
                    arr[min].state = ElementStates.Default;
                }
                
                i++;
                j = i + 1;
                min = i; 
                updateArr([...arr]);
                
                setTimeout(() => {
                    selectionSort();
                }, SHORT_DELAY_IN_MS);
            }
        } else {
            arr.forEach(element => {
                element.state = ElementStates.Modified;
            });
            updateArr([...arr]);
            setLoading(false);
            setLoadingAnim({
                selectAscLoading: false,
                selectDescLoading: false
            })
        }
    };

    selectionSort();
};

export const selectionSortDesc = (arr: ColumnObj[], updateArr: React.Dispatch<React.SetStateAction<ColumnObj[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setLoadingAnim: React.Dispatch<React.SetStateAction<LoadingAnim>>) => {
    setLoading(true);
    setLoadingAnim({
        selectAscLoading: false,
        selectDescLoading: true
    })
    const length = arr.length;

    let i = 0;
    let j = i + 1;
    let max = i;

    const selectionSort = () => {
        if (i < length - 1) {
            if (j < length) {
                arr[j].state = ElementStates.Changing;
                if(max !== i) {
                    arr[max].state = ElementStates.Changing;
                    updateArr([...arr]);
                }

                updateArr([...arr]);
                
                setTimeout(() => {
                    if (max !== j) {
                        arr[j].state = ElementStates.Default;
                    }

                    if (arr[j].number > arr[max].number) {
                        if (max !== i) {
                            arr[max].state = ElementStates.Default;
                        }
                        max = j;
                    }

                    j++;

                    selectionSort();
                }, SHORT_DELAY_IN_MS);
            } else {
                if (max !== i) {
                    swap(arr, i, max);
                    arr[i].state = ElementStates.Modified;
                    arr[max].state = ElementStates.Default; 
                } else {
                    arr[max].state = ElementStates.Default;
                }
                
                i++;
                j = i + 1;
                max = i; 
                updateArr([...arr]);
                
                setTimeout(() => {
                    selectionSort();
                }, SHORT_DELAY_IN_MS);
            }
        } else {
            arr.forEach(element => {
                element.state = ElementStates.Modified;
            });
            updateArr([...arr]);
            setLoading(false);
            setLoadingAnim({
                selectAscLoading: false,
                selectDescLoading: false
            })
        }
    };

    selectionSort();
};
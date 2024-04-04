import { useState } from "react";
import { LetterObj } from "../types/letter-obj";

export function useLetterArr(letterObj: LetterObj) {
    const [lettersArr, setLetterArr] = useState<LetterObj[]>([]);

  return {lettersArr, setLetterArr};
}

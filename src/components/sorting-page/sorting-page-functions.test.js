import { Direction } from "../../types/direction";
import { getSelectionSortSteps, getBubbleSortSteps } from "./sorting-page-functions";

it('Сортировка пустого массива пузырьком по возрастанию', () => {
    const result = getBubbleSortSteps([], Direction.Ascending);

    expect(result).toEqual([{
        currentArray: [],
        sortedIndexes: []
    }]);
});

it('Сортировка пустого массива пузырьком по убыванию', () => {
    const result = getBubbleSortSteps([], Direction.Descending);

    expect(result).toEqual([{
        currentArray: [],
        sortedIndexes: []
    }]);
});

it('Сортировка пустого массива выбором по возрастанию', () => {
    const result = getSelectionSortSteps([], Direction.Ascending);

    expect(result).toEqual([{
        currentArray: [],
        sortedIndexes: []
    }]);
});

it('Сортировка пустого массива выбором по убыванию', () => {
    const result = getSelectionSortSteps([], Direction.Descending);

    expect(result).toEqual([{
        currentArray: [],
        sortedIndexes: []
    }]);
});

it('Сортировка массива из одного элемента пузырьком по возрастанию', () => {
    const result = getBubbleSortSteps([10], Direction.Ascending);

    expect(result).toEqual([{
        currentArray: [10],
        sortedIndexes: []
    }]);
});

it('Сортировка массива из одного элемента пузырьком по убыванию', () => {
    const result = getBubbleSortSteps([10], Direction.Descending);

    expect(result).toEqual([{
        currentArray: [10],
        sortedIndexes: []
    }]);
});

it('Сортировка массива из одного элемента выбором по возрастанию', () => {
    const result = getSelectionSortSteps([10], Direction.Ascending);

    expect(result).toEqual([{
        currentArray: [10],
        sortedIndexes: []
    }]);
});

it('Сортировка массива из одного элемента выбором по убыванию', () => {
    const result = getSelectionSortSteps([10], Direction.Descending);

    expect(result).toEqual([{
        currentArray: [10],
        sortedIndexes: []
    }]);
});

it('Сортировка массива из нескольких элементов пузырьком по возрастанию', () => {
    const result = getBubbleSortSteps([10, 12, 11], Direction.Ascending);

    expect(result).toEqual([{
        aIndex: 0,
        bIndex: 1,
        currentArray: [10, 12, 11],
        sortedIndexes: []
    },
    {
        aIndex: 1,
        bIndex: 2,
        currentArray: [10, 11, 12],
        sortedIndexes: [2]
    },
    {
        aIndex: 0,
        bIndex: 1,
        currentArray: [10, 11, 12],
        sortedIndexes: [2, 1]
    },
    {
        currentArray: [10, 11, 12],
        sortedIndexes: [2, 1]
    },
    ]);
});

it('Сортировка массива из нескольких элементов пузырьком по убыванию', () => {
    const result = getBubbleSortSteps([10, 12, 11], Direction.Descending);

    expect(result).toEqual([{
        aIndex: 0,
        bIndex: 1,
        currentArray: [12, 10, 11],
        sortedIndexes: []
    },
    {
        aIndex: 1,
        bIndex: 2,
        currentArray: [12, 11, 10],
        sortedIndexes: [2]
    },
    {
        aIndex: 0,
        bIndex: 1,
        currentArray: [12, 11, 10],
        sortedIndexes: [2, 1]
    },
    {
        currentArray: [12, 11, 10],
        sortedIndexes: [2, 1]
    },
    ]);
});

it('Сортировка массива из нескольких элементов выбором по возрастанию', () => {
    const result = getSelectionSortSteps([10, 12, 11], Direction.Ascending);

    expect(result).toEqual([{
        aIndex: 0,
        bIndex: 1,
        currentArray: [10, 12, 11],
        sortedIndexes: []
    },
    {
        aIndex: 0,
        bIndex: 2,
        currentArray: [10, 12, 11],
        sortedIndexes: [0]
    },
    {
        aIndex: 1,
        bIndex: 2,
        currentArray: [10, 12, 11],
        sortedIndexes: [0, 1]
    },
    {
        currentArray: [10, 11, 12],
        sortedIndexes: [0, 1]
    },
    ]);
});

it('Сортировка массива из нескольких элементов выбором по убыванию', () => {
    const result = getSelectionSortSteps([10, 12, 11], Direction.Descending);

    expect(result).toEqual([{
        aIndex: 0,
        bIndex: 1,
        currentArray: [10, 12, 11],
        sortedIndexes: []
    },
    {
        aIndex: 0,
        bIndex: 2,
        currentArray: [10, 12, 11],
        sortedIndexes: [0]
    },
    {
        aIndex: 1,
        bIndex: 2,
        currentArray: [12, 10, 11],
        sortedIndexes: [0, 1]
    },
    {
        currentArray: [12, 11, 10],
        sortedIndexes: [0, 1]
    },
    ]);
});
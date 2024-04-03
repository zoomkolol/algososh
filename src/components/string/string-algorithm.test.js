import { getReversingStringSteps } from "./string-algorithm";

it('Разворот с четным количеством', () => {
    const result = getReversingStringSteps('аб')

    expect(result).toEqual([['а', 'б'], ['б', 'а']])
});

it('Разворот с нечетным количеством', () => {
    const result = getReversingStringSteps('абв')

    expect(result).toEqual([['а', 'б', 'в'], ['в', 'б', 'а']])
});

it('Разворот с одним символом', () => {
    const result = getReversingStringSteps('а')

    expect(result).toEqual([['а']])
});

it('Разворот пустой строки', () => {
    const result = getReversingStringSteps('')

    expect(result).toEqual([[]])
});
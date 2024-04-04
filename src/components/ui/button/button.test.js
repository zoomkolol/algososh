import { render, fireEvent, screen } from "@testing-library/react";

import { Button } from "./button";

it('Кнопка с текстом', () => {
    const button = render(<Button text='Кнопка'/>);

    expect(button).toMatchSnapshot();
});

it('Кнопка без текста', () => {
    const button = render(<Button />);

    expect(button).toMatchSnapshot();
});

it('Заблокированная кнопка', () => {
    const button = render(<Button disabled={true} />);

    expect(button).toMatchSnapshot();
});

it('Кнопка с индикацией загрузки', () => {
    const button = render(<Button isLoader={true} />);

    expect(button).toMatchSnapshot();
});

it('Вызов коллбэка кнопки', () => {
    const handleClick = jest.fn();
    const button = render(<Button text='Кнопка' onClick={handleClick} />);
    fireEvent.click(screen.getByText(/Кнопка/i));

    expect(handleClick).toBeCalledTimes(1);
});
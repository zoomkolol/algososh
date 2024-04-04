import { render } from "@testing-library/react";

import { ElementStates } from "../../../types/element-states";

import { Circle } from "./circle";

it('Круг без букв', () => {
    const circle = render(<Circle />);

    expect(circle).toMatchSnapshot();
});

it('Круг с буквой', () => {
    const circle = render(<Circle letter="А"/>);

    expect(circle).toMatchSnapshot();
});

it('Круг с head', () => {
    const circle = render(<Circle head="head"/>);

    expect(circle).toMatchSnapshot();
});

it('Круг с React элементом в head', () => {
    const circle = render(<Circle head={<Circle />}/>);

    expect(circle).toMatchSnapshot();
});

it('Круг с tail', () => {
    const circle = render(<Circle tail="tail"/>);

    expect(circle).toMatchSnapshot();
});

it('Круг с React элементом в tail', () => {
    const circle = render(<Circle tail={<Circle />}/>);

    expect(circle).toMatchSnapshot();
});

it('Круг с index', () => {
    const circle = render(<Circle index={1}/>);

    expect(circle).toMatchSnapshot();
});

it('Круг с isSmall === true', () => {
    const circle = render(<Circle isSmall={true}/>);

    expect(circle).toMatchSnapshot();
});

it('Круг default', () => {
    const circle = render(<Circle state={ElementStates.Default}/>);

    expect(circle).toMatchSnapshot();
});

it('Круг changing', () => {
    const circle = render(<Circle state={ElementStates.Changing}/>);

    expect(circle).toMatchSnapshot();
});

it('Круг modified', () => {
    const circle = render(<Circle state={ElementStates.Modified}/>);

    expect(circle).toMatchSnapshot();
});
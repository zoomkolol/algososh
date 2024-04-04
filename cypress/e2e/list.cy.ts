import { BASE_URL, BUTTON_ADD, BUTTON_CLEAR, BUTTON_DELETE, CIRCLE_SELECTOR, COLOR_CHANGING, COLOR_DEFAULT, SUBMIT_SELECTOR, CIRCLE_HEAD, CIRCLE_TAIL, COLOR_MODIFIED, BUTTON_ADD_HEAD, BUTTON_ADD_INDEX, BUTTON_ADD_TAIL, INPUT_INDEX, INPUT_VALUE, BUTTON_DELETE_HEAD, BUTTON_DELETE_TAIL, BUTTON_DELETE_INDEX } from "../support/const";

describe('Проверка страницы списка', () => {
  before(function() {
    cy.visit(BASE_URL + 'list');
  });

  it('Инпут пустой и выключен', function() {
    cy.get(INPUT_VALUE).should('have.value', '');
    cy.get(BUTTON_ADD_HEAD).should('be.disabled');
    cy.get(BUTTON_ADD_TAIL).should('be.disabled');
  });

  it('Инпут по индексу пустой и выключен', function() {
    cy.get(INPUT_VALUE).should('have.value', '');
    cy.get(INPUT_INDEX).should('have.value', '');
    cy.get(BUTTON_ADD_INDEX).should('be.disabled');
    cy.get(INPUT_VALUE).type('1');
    cy.get(BUTTON_ADD_INDEX).should('be.disabled');
    cy.get(INPUT_VALUE).clear();
  });

  it('Добавляем в head', function() {
    cy.get(INPUT_VALUE).type('1');
    cy.get(BUTTON_ADD_HEAD).click();

    cy.get(CIRCLE_SELECTOR).then((circle: any) => {
      cy.get(circle.eq(0)).contains('1');
      cy.get(circle.eq(0)).should('have.css', 'border-color', COLOR_DEFAULT);
    });

    cy.get(CIRCLE_HEAD).then((head: any) => {
      cy.get(head.eq(0)).should('contain', 'head');
    });

    cy.get(CIRCLE_TAIL).then((tail: any) => {
      cy.get(tail.eq(0)).should('contain', 'tail');
    });
  });

  it('Добавляем в tail', function() {
    cy.get(INPUT_VALUE).type('2');
    cy.get(BUTTON_ADD_TAIL).click();

    cy.get(CIRCLE_SELECTOR).each((circle: any, index) => {
      cy.get(circle).contains('12'.split('')[index]);
      cy.get(circle).should('have.css', 'border-color', [COLOR_DEFAULT, COLOR_DEFAULT][index]);
    });

    cy.get(CIRCLE_HEAD).each((head: any, index) => {
      cy.get(head).should('contain', ['head', ''][index]);
    });

    cy.get(CIRCLE_TAIL).each((tail: any, index) => {
      cy.get(tail).should('contain', ['', 'tail'][index]);
    });
  });

  it('Добавляем по индексу', function() {
    cy.get(INPUT_VALUE).type('3');
    cy.get(INPUT_INDEX).type('1');
    cy.get(BUTTON_ADD_INDEX).click();

    cy.get(CIRCLE_SELECTOR).each((circle: any, index) => {
      cy.get(circle).contains('132'.split('')[index]);
      cy.get(circle).should('have.css', 'border-color', [COLOR_DEFAULT, COLOR_DEFAULT, COLOR_DEFAULT][index]);
    });

    cy.get(CIRCLE_HEAD).each((head: any, index) => {
      cy.get(head).should('contain', ['head', '', ''][index]);
    });

    cy.get(CIRCLE_TAIL).each((tail: any, index) => {
      cy.get(tail).should('contain', ['', '', 'tail'][index]);
    });
  });

  it('Удаляем из head', function() {
    cy.get(BUTTON_DELETE_HEAD).click();

    cy.wait(2000);

    cy.get(CIRCLE_SELECTOR).each((circle: any, index) => {
      cy.get(circle).contains('32'.split('')[index]);
      cy.get(circle).should('have.css', 'border-color', [COLOR_DEFAULT, COLOR_DEFAULT][index]);
    });
    
    cy.get(CIRCLE_HEAD).each((head: any, index) => {
      cy.get(head).should('contain', ['head', ''][index]);
    });

    cy.get(CIRCLE_TAIL).each((tail: any, index) => {
      cy.get(tail).should('contain', ['', 'tail'][index]);
    });
  });

  it('Удаляем из tail', function() {
    cy.get(BUTTON_DELETE_TAIL).click();

    cy.wait(2000);

    cy.get(CIRCLE_SELECTOR).then((circle: any) => {
      cy.get(circle.eq(0)).contains('3');
      cy.get(circle.eq(0)).should('have.css', 'border-color', COLOR_DEFAULT);
    });

    cy.get(CIRCLE_HEAD).each((head: any, index) => {
      cy.get(head).should('contain', ['head'][index]);
    });

    cy.get(CIRCLE_TAIL).each((tail: any, index) => {
      cy.get(tail).should('contain', ['tail'][index]);
    });
  });

  it('Удаляем по индексу', function() {
    cy.get(INPUT_INDEX).type('0');
    cy.get(BUTTON_DELETE_INDEX).click();

    cy.get(CIRCLE_SELECTOR).should('not.exist');
  });
})
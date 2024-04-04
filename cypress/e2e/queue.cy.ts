import { BASE_URL, BUTTON_ADD, BUTTON_CLEAR, BUTTON_DELETE, CIRCLE_SELECTOR, COLOR_CHANGING, COLOR_DEFAULT, SUBMIT_SELECTOR, CIRCLE_HEAD, CIRCLE_TAIL, COLOR_MODIFIED, INPUT_VALUE } from "../support/const";

describe('Проверка страницы очереди', () => {
  before(function() {
    cy.visit(BASE_URL + 'queue');
  });

  it('Инпут пустой и выключен', function() {
    cy.get(INPUT_VALUE).should('have.value', '');
    cy.get(BUTTON_ADD).should('be.disabled');
  });

  it('Добавляем в очередь', function() {
    cy.get(INPUT_VALUE).type('1');
    cy.get(BUTTON_ADD).click();

    cy.get(CIRCLE_SELECTOR).then((circle: any) => {
      cy.get(circle.eq(0)).contains('1');
      cy.get(circle.eq(0)).should('have.css', 'border-color', COLOR_CHANGING);
      cy.get(circle.eq(0)).should('have.css', 'border-color', COLOR_DEFAULT);
    });

    cy.get(CIRCLE_HEAD).each((head: any, index) => {
      cy.get(head).should('contain', ['head', '', '', '', '', '', ''][index]);
    });

    cy.get(CIRCLE_TAIL).each((head: any, index) => {
      cy.get(head).should('contain', ['tail', '', '', '', '', '', ''][index]);
    });

    cy.wait(1000);

    cy.get(INPUT_VALUE).type('2');
    cy.get(BUTTON_ADD).click();

    cy.get(CIRCLE_SELECTOR).then((circle: any) => {
      cy.get(circle.eq(0)).contains('1');
      cy.get(circle.eq(0)).should('have.css', 'border-color', COLOR_DEFAULT);
      cy.get(circle.eq(1)).contains('2');
      cy.get(circle.eq(1)).should('have.css', 'border-color', COLOR_CHANGING);
      cy.get(circle.eq(1)).should('have.css', 'border-color', COLOR_DEFAULT);
    });

    cy.get(CIRCLE_HEAD).each((head: any, index) => {
      cy.get(head).should('contain', ['head', '', '', '', '', '', ''][index]);
    });

    cy.get(CIRCLE_TAIL).each((head: any, index) => {
      cy.get(head).should('contain', ['', 'tail', '', '', '', '', ''][index]);
    });

    cy.wait(1000);

    cy.get(INPUT_VALUE).type('3');
    cy.get(BUTTON_ADD).click();

    cy.get(CIRCLE_SELECTOR).then((circle: any) => {
      cy.get(circle.eq(0)).contains('1');
      cy.get(circle.eq(0)).should('have.css', 'border-color', COLOR_DEFAULT);
      cy.get(circle.eq(1)).contains('2');
      cy.get(circle.eq(1)).should('have.css', 'border-color', COLOR_DEFAULT);
      cy.get(circle.eq(2)).contains('3');
      cy.get(circle.eq(2)).should('have.css', 'border-color', COLOR_CHANGING);
      cy.get(circle.eq(2)).should('have.css', 'border-color', COLOR_DEFAULT);
    });

    cy.get(CIRCLE_HEAD).each((head: any, index) => {
      cy.get(head).should('contain', ['head', '', '', '', '', '', ''][index]);
    });

    cy.get(CIRCLE_TAIL).each((head: any, index) => {
      cy.get(head).should('contain', ['', '', 'tail', '', '', '', ''][index]);
    });
  });

  it('Удаляем из очереди', function() {
    cy.get(BUTTON_DELETE).click();

    cy.get(CIRCLE_SELECTOR).then((circle: any) => {
      cy.get(circle.eq(0)).should('have.css', 'border-color', COLOR_CHANGING);
      cy.get(circle.eq(0)).should('have.prop', 'textContent', '');
      cy.get(circle.eq(0)).should('have.css', 'border-color', COLOR_DEFAULT);
      cy.get(circle.eq(1)).contains('2');
      cy.get(circle.eq(1)).should('have.css', 'border-color', COLOR_DEFAULT);
      cy.get(circle.eq(2)).contains('3');
      cy.get(circle.eq(2)).should('have.css', 'border-color', COLOR_DEFAULT);
    });

    cy.get(CIRCLE_HEAD).each((head: any, index) => {
      cy.get(head).should('contain', ['', 'head', '', '', '', '', ''][index]);
    });

    cy.get(CIRCLE_TAIL).each((head: any, index) => {
      cy.get(head).should('contain', ['', '', 'tail', '', '', '', ''][index]);
    });
  });

  it('Очищаем очередь', function() {
    cy.get(BUTTON_CLEAR).click();
    
    cy.get(CIRCLE_SELECTOR).each((circle: any, index) => {
      cy.get(circle).should('have.css', 'border-color', COLOR_DEFAULT);
      cy.get(circle).should('have.prop', 'textContent', '');
    });

    cy.get(CIRCLE_HEAD).each((head: any, index) => {
      cy.get(head).should('contain', ['', '', '', '', '', '', ''][index]);
    });

    cy.get(CIRCLE_TAIL).each((head: any, index) => {
      cy.get(head).should('contain', ['', '', '', '', '', '', ''][index]);
    });
  });
})
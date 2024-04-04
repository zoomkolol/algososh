import { BASE_URL, CIRCLE_SELECTOR, COLOR_CHANGING, COLOR_DEFAULT, COLOR_MODIFIED, SUBMIT_SELECTOR } from "../support/const";

describe('Проверка страницы разворота строки', () => {
  before(function() {
    cy.visit(BASE_URL + 'recursion');
  });

  it('Инпут пустой и выключен', function() {
    cy.get('input').should('have.value', '');
    cy.get(SUBMIT_SELECTOR).should('be.disabled');
  });

  it('Строка разворачивается корректно', function() {
    cy.get('input[name="value"]').type('1234');
    cy.get(SUBMIT_SELECTOR).click();

    cy.get(CIRCLE_SELECTOR).each((circle: any, index) => {
      cy.get(circle).contains('1234'.split('')[index]);
      cy.get(circle).should('have.css', 'border-color', [COLOR_CHANGING, COLOR_DEFAULT, COLOR_DEFAULT, COLOR_CHANGING][index]);
    });

    cy.get(CIRCLE_SELECTOR).each((circle: any, index) => {
      cy.get(circle).contains('4231'.split('')[index]);
      cy.get(circle).should('have.css', 'border-color', [COLOR_MODIFIED, COLOR_CHANGING, COLOR_CHANGING, COLOR_MODIFIED][index]);
    });

    cy.get(CIRCLE_SELECTOR).each((circle: any, index) => {
      cy.get(circle).contains('4321'.split('')[index]);
      cy.get(circle).should('have.css', 'border-color', [COLOR_MODIFIED, COLOR_MODIFIED, COLOR_MODIFIED, COLOR_MODIFIED][index]);
    });
  });
})
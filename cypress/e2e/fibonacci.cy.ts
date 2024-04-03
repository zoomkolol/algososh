import { BASE_URL, CIRCLE_SELECTOR, SUBMIT_SELECTOR } from "../support/const";

describe('Проверка страницы Фибоначчи', () => {
  before(function() {
    cy.visit(BASE_URL + 'fibonacci');
  });

  it('Инпут пустой и выключен', function() {
    cy.get('input').should('have.value', '');
    cy.get(SUBMIT_SELECTOR).should('be.disabled');
  });

  it('Последовательность корректна', function() {
    cy.get('input[name="value"]').type('4');
    cy.get(SUBMIT_SELECTOR).click();
    
    cy.wait(6000);

    cy.get(CIRCLE_SELECTOR).each((circle: any, index) => {
      cy.get(circle).contains('11235'.split('')[index]);
    });
  });
})
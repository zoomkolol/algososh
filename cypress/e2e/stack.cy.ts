import { BASE_URL, BUTTON_ADD, BUTTON_CLEAR, BUTTON_DELETE, CIRCLE_SELECTOR, COLOR_CHANGING, COLOR_DEFAULT, SUBMIT_SELECTOR } from "../support/const";

describe('Проверка страницы стека', () => {
  before(function() {
    cy.visit(BASE_URL + 'stack');
  });

  it('Инпут пустой и выключен', function() {
    cy.get('input').should('have.value', '');
    cy.get(BUTTON_ADD).should('be.disabled');
  });

  it('Добавляем в стек', function() {
    cy.get('input[name="value"]').type('1');
    cy.get(BUTTON_ADD).click();
    
    cy.wait(2000);

    cy.get(CIRCLE_SELECTOR).each((circle: any, index) => {
      cy.get(circle).contains('1'.split('')[index]);
      cy.get(circle).should('have.css', 'border-color', [COLOR_CHANGING][index]);
    });

    cy.get('input[name="value"]').type('2');
    cy.get(BUTTON_ADD).click();
    
    cy.wait(2000);

    cy.get(CIRCLE_SELECTOR).each((circle: any, index) => {
      cy.get(circle).contains('12'.split('')[index]);
      cy.get(circle).should('have.css', 'border-color', [COLOR_DEFAULT, COLOR_CHANGING][index]);
    });

    cy.get('input[name="value"]').type('s');
    cy.get(BUTTON_ADD).click();
    
    cy.wait(2000);

    cy.get(CIRCLE_SELECTOR).each((circle: any, index) => {
      cy.get(circle).contains('12s'.split('')[index]);
      cy.get(circle).should('have.css', 'border-color', [COLOR_DEFAULT, COLOR_DEFAULT, COLOR_CHANGING][index]);
    });
  });

  it('Удаляем из стека', function() {
    cy.get(BUTTON_DELETE).click();
    
    cy.wait(2000);

    cy.get(CIRCLE_SELECTOR).each((circle: any, index) => {
      cy.get(circle).contains('12'.split('')[index]);
      cy.get(circle).should('have.css', 'border-color', [COLOR_DEFAULT, COLOR_CHANGING][index]);
    });
  });

  it('Очищаем стек', function() {
    cy.get(BUTTON_CLEAR).click();
    
    cy.wait(2000);

    cy.get(CIRCLE_SELECTOR).should('not.exist');
  });
})
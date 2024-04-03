import { BASE_URL } from "../support/const";

describe('Проверка роутинга', function() {
  before(function() {
    cy.visit(BASE_URL);
  });

  it('Открытие страницы Строка', function() {
    cy.get('[data-cy="recursion-main"]').click();
    cy.get('[data-cy="recursion-page"]').should('exist');
    cy.go('back');
  });

  it('Открытие страницы Фибоначчи', function() {
    cy.get('[data-cy="fibonacci-main"]').click();
    cy.get('[data-cy="fibonacci-page"]').should('exist');
    cy.go('back');
  });

  it('Открытие страницы Сортировка', function() {
    cy.get('[data-cy="sorting-main"]').click();
    cy.get('[data-cy="sorting-page"]').should('exist');
    cy.go('back');
  });

  it('Открытие страницы Стек', function() {
    cy.get('[data-cy="stack-main"]').click();
    cy.get('[data-cy="stack-page"]').should('exist');
    cy.go('back');
  });

  it('Открытие страницы Очередь', function() {
    cy.get('[data-cy="queue-main"]').click();
    cy.get('[data-cy="queue-page"]').should('exist');
    cy.go('back');
  });

  it('Открытие страницы Лист', function() {
    cy.get('[data-cy="list-main"]').click();
    cy.get('[data-cy="list-page"]').should('exist');
    cy.go('back');
  });
});
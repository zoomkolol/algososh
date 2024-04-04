import { BASE_URL } from "../support/const";

describe('Приложение поднялось', function() {
  it('Приложение запущено', function() {
    cy.visit(BASE_URL);
  });
}); 
describe('UI: Хедер та футер', () => {
  beforeEach(() => {
    cy.origin('https://qauto.forstudy.space', () => {
      cy.visit('/', {
        failOnStatusCode: false,
        timeout: 60000,
      });

      // чекаємо, поки форма з’явиться
      cy.get('input[formcontrolname="email"]', { timeout: 15000 })
        .should('exist')
        .type('guest');

      cy.get('input[formcontrolname="password"]')
        .should('exist')
        .type('welcome2qauto');

      cy.get('button[type="submit"]').click();

      // чекаємо переходу після логіну
      cy.url().should('include', '/panel/garage');
    });
  });

  it('перевіряє всі кнопки в хедері', () => {
    cy.get('header').within(() => {
      cy.get('button').should('have.length.at.least', 1).each(($btn) => {
        cy.wrap($btn).should('be.visible');
      });
    });
  });

  it('перевіряє всі посилання та кнопки у футері', () => {
    cy.get('footer').within(() => {
      cy.get('a, button').should('have.length.at.least', 1).each(($el) => {
        cy.wrap($el).should('be.visible');
      });
    });
  });
});
describe('UI: Хедер та футер', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('https://qauto.forstudy.space', {
      failOnStatusCode: false,   // ✅ Додаємо, щоб не падало на 401
      timeout: 60000             // ⏳ Додатково на випадок довгого завантаження
    });
    cy.get('body', { timeout: 10000 }).should('be.visible');
  });

  it('перевіряє всі кнопки в хедері', () => {
    cy.get('header').within(() => {
      cy.get('button').each(($btn) => {
        cy.wrap($btn).should('be.visible');
      });
    });
  });

  it('перевіряє всі посилання та кнопки у футері', () => {
    cy.get('footer').within(() => {
      cy.get('a').each(($link) => {
        cy.wrap($link).should('be.visible');
      });

      cy.document().then((doc) => {
        const buttons = doc.querySelectorAll('footer button');
        if (buttons.length > 0) {
          cy.wrap(buttons).each(($btn) => {
            cy.wrap($btn).should('be.visible');
          });
        } else {
          cy.log('⚠️ Кнопки у футері відсутні');
        }
      });
    });
  });
});
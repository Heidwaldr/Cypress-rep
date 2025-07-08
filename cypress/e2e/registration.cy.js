describe('User Registration Form Validation', () => {
  const baseUrl = 'https://qauto.forstudy.space';

  beforeEach(() => {
    // Відкрити головну сторінку
    cy.visit(baseUrl, { failOnStatusCode: false });

    // Відкрити модальне вікно логіну
    cy.contains('Login', { timeout: 10000 }).click();

    // Перейти до форми реєстрації
    cy.contains('Registration').should('be.visible').click();

    // Переконатися, що форма реєстрації відкрита
    cy.get('input[formcontrolname="firstName"]').should('be.visible');
  });

  it('Should show required field errors', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Name is required').should('be.visible');
    cy.contains('Last name is required').should('be.visible');
    cy.contains('Email required').should('be.visible');
    cy.contains('Password required').should('be.visible');
    cy.contains('Re-enter password required').should('be.visible');
  });

  it('Should validate name format and length', () => {
    cy.get('input[formcontrolname="firstName"]').type('1@');
    cy.get('input[formcontrolname="lastName"]').type('$$$');
    cy.get('button[type="submit"]').click();

    cy.contains('Name is invalid').should('be.visible');
    cy.contains('Last name is invalid').should('be.visible');

    cy.get('input[formcontrolname="firstName"]').clear().type('A');
    cy.get('input[formcontrolname="lastName"]').clear().type('B');
    cy.get('button[type="submit"]').click();

    cy.contains('Name has to be from 2 to 20 characters long').should('be.visible');
    cy.contains('Last name has to be from 2 to 20 characters long').should('be.visible');
  });

  it('Should validate email format', () => {
    cy.get('input[formcontrolname="email"]').type('not-an-email');
    cy.get('button[type="submit"]').click();
    cy.contains('Email is incorrect').should('be.visible');
  });

  it('Should validate password complexity', () => {
    cy.get('input[formcontrolname="password"]').type('pass123');
    cy.get('button[type="submit"]').click();

    cy.contains(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    ).should('be.visible');
  });

  it('Should validate password mismatch', () => {
    cy.get('input[formcontrolname="password"]').type('ValidPass1');
    cy.get('input[formcontrolname="repeatPassword"]').type('OtherPass1');
    cy.get('button[type="submit"]').click();

    cy.contains('Passwords do not match').should('be.visible');
  });

  it('Should register user successfully', () => {
    const timestamp = Date.now();
    const email = `test${timestamp}@mail.com`;

    cy.get('input[formcontrolname="firstName"]').type('John');
    cy.get('input[formcontrolname="lastName"]').type('Doe');
    cy.get('input[formcontrolname="email"]').type(email);
    cy.get('input[formcontrolname="password"]').type('StrongPass1', { log: false });
    cy.get('input[formcontrolname="repeatPassword"]').type('StrongPass1', { log: false });

    cy.get('button[type="submit"]').click();

    // Після реєстрації має зникнути форма
    cy.contains('Registration').should('not.exist');
  });
});
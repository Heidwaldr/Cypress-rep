describe('User Registration', () => {
  const uniqueEmail = `test_${Date.now()}@example.com`
  const password = 'Test1234'

  beforeEach(() => {
    cy.visit('https://qauto.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto'
      }
    })

    // Крок 2: Очікуємо завантаження панелі
    cy.url().should('include', '/panel');

    // Крок 3: Відкрити форму створення нового користувача
    cy.contains('Add new').click();

    // Перевіряємо, що з’явилася форма
    cy.get('form').should('be.visible');
  });

  it('Should validate required fields', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Name is required').should('be.visible');
    cy.contains('Last name is required').should('be.visible');
    cy.contains('Email required').should('be.visible');
    cy.contains('Password required').should('be.visible');
    cy.contains('Re-enter password required').should('be.visible');
  });

  it('Should validate incorrect name and last name', () => {
    cy.get('input[formcontrolname="firstName"]').type('1@');
    cy.get('input[formcontrolname="lastName"]').type('!@#');
    cy.get('button[type="submit"]').click();

    cy.contains('Name is invalid').should('be.visible');
    cy.contains('Last name is invalid').should('be.visible');
  });

  it('Should validate name and last name length', () => {
    cy.get('input[formcontrolname="firstName"]').type('A');
    cy.get('input[formcontrolname="lastName"]').type('B');
    cy.get('button[type="submit"]').click();

    cy.contains('Name has to be from 2 to 20 characters long').should('be.visible');
    cy.contains('Last name has to be from 2 to 20 characters long').should('be.visible');
  });

  it('Should validate incorrect email', () => {
    cy.get('input[formcontrolname="email"]').type('invalid-email');
    cy.get('button[type="submit"]').click();

    cy.contains('Email is incorrect').should('be.visible');
  });

  it('Should validate password rules', () => {
    cy.get('input[formcontrolname="password"]').type('abc');
    cy.get('button[type="submit"]').click();

    cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
      .should('be.visible');
  });

  it('Should validate mismatched passwords', () => {
    cy.get('input[formcontrolname="password"]').type('Valid123');
    cy.get('input[formcontrolname="repeatPassword"]').type('Different123');
    cy.get('button[type="submit"]').click();

    cy.contains('Passwords do not match').should('be.visible');
  });

  it('Should register successfully with valid data', () => {
    const timestamp = Date.now();
    const email = `user_${timestamp}@example.com`;

    cy.get('input[formcontrolname="firstName"]').type('John');
    cy.get('input[formcontrolname="lastName"]').type('Doe');
    cy.get('input[formcontrolname="email"]').type(email);
    cy.get('input[formcontrolname="password"]').type('Valid123');
    cy.get('input[formcontrolname="repeatPassword"]').type('Valid123');
    cy.get('button[type="submit"]').click();

    // Очікуємо, що користувач доданий (наприклад, з'явиться в таблиці)
    cy.contains(email).should('be.visible');
  });
});
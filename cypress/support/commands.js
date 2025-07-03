Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://qauto.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto'
      }
    })
  
    cy.contains('Sign In').click()
    cy.get('#signinEmail').type(email)
    cy.get('#signinPassword').type(password, { sensitive: true })
    cy.contains('Login').click()
  
    cy.contains('Garage', { timeout: 10000 }).should('be.visible')
  })
  
  // Перевизначення команди type для маскування паролів у логах
  Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
      options.log = false
      Cypress.log({
        $el: element,
        name: 'type',
        message: '*'.repeat(text.length),
      })
    }
  
    return originalFn(element, text, options)
  })
  
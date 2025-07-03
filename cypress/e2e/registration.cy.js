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
  
      cy.contains('Sign In').click()
      cy.contains('Login').should('be.visible')
      cy.contains('Registration').should('be.visible').click()
  
      cy.contains('Re-enter password').should('exist')
    })
  
    it('should show validation messages for empty fields', () => {
      cy.contains('button', 'Register').click({ force: true })
  
      cy.contains('Name is required').should('be.visible')
      cy.contains('Last name is required').should('be.visible')
      cy.contains('Email required').should('be.visible')
      cy.contains('Password required').should('be.visible')
      cy.contains('Re-enter password required').should('be.visible')
    })
  
    it('should register a new user with valid data', () => {
      cy.get('#signupName').type('Vlad')
      cy.get('#signupLastName').type('Kubrak')
      cy.get('#signupEmail').type(uniqueEmail)
      cy.get('#signupPassword').type(password, { sensitive: true })
      cy.get('#signupRepeatPassword').type(password, { sensitive: true })
  
      cy.contains('button', 'Register').click()
  
      cy.contains('Garage', { timeout: 10000 }).should('be.visible')
    })
  })
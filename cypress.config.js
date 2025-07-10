import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false // або вкажи, якщо є support файл
  }
})
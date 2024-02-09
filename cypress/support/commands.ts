import { login } from "../e2e/common/login"

Cypress.Commands.add('login', login)

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>
    }
  }
}

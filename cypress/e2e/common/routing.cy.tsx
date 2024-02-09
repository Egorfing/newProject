import { selectByTestId } from "../../helpers/selectByTestId"

describe('Роутинг', () => {
describe('Пользователь НЕ авторизован', () => {
  it('Переход на главную страницу', () => {
    cy.visit('/')
    cy.get(selectByTestId('MainPage')).should('exist')
  })
  it('Переход на странице профиля', () => {
    cy.visit('/profile/1')
    cy.get(selectByTestId('MainPage')).should('exist')
  })
  it('Переход на не существующую страницу', () => {
    cy.visit('/sdhdsjfdlkfjl')
    cy.get(selectByTestId('NotFoundPage')).should('exist')
  })
})
describe('Пользователь авторизован', () => {
  beforeEach(() => {
    cy.login()
  })
  it('Переход на странице профиля', () => {
    cy.visit('/profile/1')
    cy.get(selectByTestId('ProfilePage')).should('exist')
  })
  it('Переход на страницу со списком статей', () => {
    cy.visit('/articles')
    cy.get(selectByTestId('ArticlesPage')).should('exist')
  })
})

  
})
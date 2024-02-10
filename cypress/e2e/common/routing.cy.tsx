describe('Роутинг', () => {
describe('Пользователь НЕ авторизован', () => {
  it('Переход на главную страницу', () => {
    cy.visit('/')
    cy.getByTestId('MainPage').should('exist')
  })
  it('Переход на странице профиля', () => {
    cy.visit('/profile/1')
    cy.getByTestId('MainPage').should('exist')
  })
  it('Переход на не существующую страницу', () => {
    cy.visit('/sdhdsjfdlkfjl')
    cy.getByTestId('NotFoundPage').should('exist')
  })
})
describe('Пользователь авторизован', () => {
  beforeEach(() => {
    cy.login()
  })
  it('Переход на странице профиля', () => {
    cy.visit('/profile/1')
    cy.getByTestId('ProfilePage').should('exist')
  })
  it('Переход на страницу со списком статей', () => {
    cy.visit('/articles')
    cy.getByTestId('ArticlesPage').should('exist')
  })
})

  
})
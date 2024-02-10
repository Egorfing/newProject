describe('Пользователь заходит на страницу со списком статей', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit('/articles')
    })
  })
  it('Статьи успешно подгружаются', () => {
    cy.getByTestId('ArticleList').should('exist')
    cy.getByTestId('ArticleItem').should('have.length.greaterThan', 3)
  })
  it('Статьи успешно подгружаются на стабах', () => {
    cy.intercept('GET', '**/articles?*', {fixture: 'articles.json'})
    cy.getByTestId('ArticleList').should('exist')
    cy.getByTestId('ArticleItem').should('have.length.greaterThan', 3)
  })
})
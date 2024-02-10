let currentArticleId: string
describe('Пользователь заходит на страницу со статьей', () => {
  beforeEach(() => {
    cy.login()
    cy.createArticle().then((article) => {
      currentArticleId = article.id
      cy.visit(`/articles/${article.id}`)
    })
  })
  afterEach(() => {
    cy.removeArticle(currentArticleId)
  })
  it('И видит содержимое статьи', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist')
  })
  it('И видит список рекомендаций', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist')
  })
  it('И оставляем комментарий', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist')
    cy.getByTestId('AddCommentForm').scrollIntoView()
    cy.addComment('text')
    cy.getByTestId('CommentCard.Content').should('have.length', 1)
  })
  it('И оцениваем статью', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist')
    cy.getByTestId('RatingCard').scrollIntoView()
    cy.setRate(2, 'feedback')
    cy.get('[data-selected=true]').should('have.length', 2)
  })
})
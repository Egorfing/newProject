let profileId: string;

describe('Пользователь заходит на страницу профиля', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.login().then((body) => {
      profileId = body.id
      cy.visit(`/profile/${body.id}`)
    })
  })
  afterEach(() => {
    cy.resetProfile(profileId)
  })
  it('Профиль успешно загрузился', (
    ) => {
      cy.getByTestId('ProfileCard.firstname').should('have.value', 'test')
    })
  it('Редактирует карточку', () => {
    const newName = 'new'
    const newLastname = 'lastname'
    cy.updateProfile(newName, newLastname)
    cy.getByTestId('ProfileCard.firstname').should('have.value', newName)
    cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname)
  })
})
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')

    const user = {
      name: 'admin',
      username: 'admin',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 

  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('salasana')
      cy.contains('login').click()

      cy.contains('admin logged in')

    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('salasana1')
      cy.contains('login').click()

      cy.get('.bad')
      .should('contain', 'bad username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'admin', password: 'salasana'
      }).then(response => {
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('Post blog').click()

      cy.get('#author').type('Kirjailija Kikka')
      cy.get('#title').type('Testing Blog Features')
      cy.get('#URL').type('www.address.test')
      cy.contains('create').click()

      cy.contains('Kirjailija Kikka')
      cy.contains('Testing Blog Features')
      cy.contains('view')

    })
  })
})
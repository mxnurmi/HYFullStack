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

    it('A blog can be liked', function() {

      // console.log(JSON.parse(localStorage.getItem('loggedBlogAppUser')).token)

      // const content = {
      //   author: 'Testaaja Ukkelisson', 
      //   title: 'Testing Blogs', 
      //   url: 'www.test.com'
      // }

      // cy.request({
      //   url: 'http://localhost:3001/api/blogs',
      //   method: 'POST',
      //   body: content,
      //   headers: {
      //     'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
      //   }
      // }).then(
      //   cy.contains('Testaaja Ukkelisson')
      // )

      cy.contains('Post blog').click()

      cy.get('#author').type('Kirjailija Kikka')
      cy.get('#title').type('Testing Blog Features')
      cy.get('#URL').type('www.address.test')
      cy.contains('create').click()
      cy.contains('view').click()

      cy.contains('likes 0')
      cy.contains('Like').click()
      cy.contains('likes 1')
    })

    it.only('A blogs are ordered by the amount of likes', function() {
      cy.contains('Post blog').click()
      cy.get('#author').type('Kirjailija Yksi')
      cy.get('#title').type('Testing Blogging')
      cy.get('#URL').type('www.address.test')
      cy.contains('create').click()

      cy.contains('Post blog').click()
      cy.get('#author').type('Kirjailija Kaksi')
      cy.get('#title').type('Testing Likes')
      cy.get('#URL').type('www.issues.test')
      cy.contains('create').click()

      cy.contains('Post blog').click()
      cy.get('#author').type('Kirjailija Kolme')
      cy.get('#title').type('Testing Likendaarus')
      cy.get('#URL').type('www.testing.test')
      cy.contains('create').click()

      cy.contains('Kirjailija Yksi').parent().find('#view').click()
      cy.contains('Kirjailija Yksi').parent().find('#Like').as('firstButton')
      cy.get('@firstButton').click()

      cy.contains('Kirjailija Kaksi').parent().find('#view').click()
      cy.contains('Kirjailija Kaksi').parent().find('#Like').as('secondButton')
      cy.get('@secondButton').click().click().click()

      cy.get('#info').eq(0).contains('Kirjailija Kaksi')
      cy.get('@firstButton').click().click().click()

      cy.get('#info').eq(0).contains('Kirjailija Yksi')

      // cy.contains('www.address.test').parent().find('Like').click().click()

    })



  })
})
import LoginPage from "../pages/LoginPage"

describe('Verify login credentials', () => {

let userData: {username: string, password: string}

  beforeEach(()=>
  {

    // Load fixture data before each test
    cy.fixture('user_login').then((data)=>{
      userData = data;
    })


    LoginPage.VisitLoginPage();
    cy.url().should('eq', 'http://localhost:3000/signin');
  })

  it('Correct Login credentials', () => {
    //From the fixture data, get a random username and password from the list
    const randomUsername = userData.username[Math.floor(Math.random() * userData.username.length)];
    LoginPage.loginWithFixtures(randomUsername, userData.password);
    LoginPage.clickSignInButton();
  })

  it('Incorrect Login credentials', ()=> {
    const randomUsername = userData.username[Math.floor(Math.random() * userData.username.length)];
    LoginPage.loginWithIncorrectCredentials(randomUsername);
    LoginPage.clickSignInButton();
    cy.getByData('signin-error').should('be.visible').and('contain', 'Username or password is invalid');
  })

  it('Empty login credentials', ()=>{
    LoginPage.loginWithNoInputs();
    cy.getByData('signin-submit').should('be.disabled');
    cy.get('p#username-helper-text').should('be.visible').and('contain', 'Username is required');
  })
})
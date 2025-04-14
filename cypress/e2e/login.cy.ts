/// <reference types ="cypress"/>

import LoginPage from "../pages/LoginPage"

describe('Verify login credentials', () => {

let userData: {username: string[], password: string}


  before(()=>{
       // Load fixture data before each test
       //Advised that we need add the fixtures in before instead of beforeEach because of the async nature of the code
       //Load fixture once before all tests
       cy.fixture('user_login').then((data)=>{
        userData = data;
      });
  })

  beforeEach(()=>
  {
    LoginPage.VisitLoginPage();
    cy.url().should('eq', 'http://localhost:3000/signin');

  });

  it('Correct Login credentials', () => {
    //From the fixture data, get a random username and password from the list
    // const randomUsername = userData.username[Math.floor(Math.random() * userData.username.length)];
    LoginPage.loginWithFixtures(userData.username[1], userData.password);
    LoginPage.SignInButton().click();
    //redirected to dashboard and verify that the everyone tab is visible
    cy.getByData('nav-public-tab').should('have.text', 'Everyone');

  });

  it('Incorrect Login credentials', ()=> {
    const randomUsername = userData.username[Math.floor(Math.random() * userData.username.length)];
    LoginPage.loginWithIncorrectCredentials(randomUsername);
    LoginPage.SignInButton().click();
    cy.getByData('signin-error').should('be.visible').and('contain', 'Username or password is invalid');
  });

  it('Empty login credentials', ()=>{
    LoginPage.loginWithNoInputs();
    // cy.getByData('signin-submit').should('be.disabled');
    LoginPage.SignInButton().should('be.disabled');
    cy.get('p#username-helper-text').should('be.visible').and('contain', 'Username is required');
  });

  it('Password less than 4 characters', ()=>{
    LoginPage.loginPasswordlessthan4chars();
    cy.getByData('signin-submit').should('be.disabled');
    cy.getValidationMessage('password-helper-text').should('have.text', 'Password must contain at least 4 characters');
  });
})
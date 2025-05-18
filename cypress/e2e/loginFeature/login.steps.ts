import {Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/LoginPage";
import {loadUserFixture} from "../../support/hooks/userFixture";
import {loadLoginPage} from "../../support/hooks/loginPage";




loadUserFixture();
loadLoginPage();



Given('I am on login page and input valid credentials',function (){

    return LoginPage.VisitLoginPage()
        .then(()=>{
            LoginPage.loginWithFixtures(this.userData.username[1], this.userData.password);
        })    
})

Given('I am on login page and input invalid credentials',function (){

    const randomUsername = this.userData.username[Math.floor(Math.random() * this.userData.username.length)];
    return LoginPage.VisitLoginPage()
        .then(()=>{
            LoginPage.loginWithIncorrectCredentials(randomUsername);
        }) 
    
})

Given('I am on login page and no inputs used on the fields',function (){
    return LoginPage.VisitLoginPage()
        .then(()=>{
            LoginPage.loginWithNoInputs();
        }) 
    
})

Given('I am on login page and input password less than 4 characters', () => {
    return LoginPage.VisitLoginPage()
        .then(()=>{
            LoginPage.loginPasswordlessthan4chars();
        })
})

When('Click login button',function (){
    return LoginPage.SignInButton().click();
})

When('Click login button disabled', () => {
    return LoginPage.SignInButton().should('be.disabled');
})

Then('User successfully logged in',function (){
    return cy.getByData('nav-public-tab').should('have.text', 'Everyone');
})

Then('User not successfully logged in and error message displayed', () => {
   return cy.getByData('signin-error').should('be.visible').and('contain', 'Username or password is invalid');
})

Then ('Error message displayed under username field',() => {
    return cy.get('p#username-helper-text').should('be.visible').and('contain', 'Username is required');
})

Then('Error message displayed under password field', ()=>{
    return cy.getValidationMessage('password-helper-text').should('have.text', 'Password must contain at least 4 characters');
})
import SignUpPage from "../pages/SignUpPage"

describe('Verify Signup Test Cases', ()=>{
    beforeEach(()=>{
        SignUpPage.verifySignUpLink();
        cy.getByData("signup").should("be.visible").and("have.text", "Don't have an account? Sign Up").click();
        cy.url().should("include", "/signup");
    })

    it('Verify Sign Up Link redirection and required fields validation', ()=>{

        SignUpPage.noInputonAllFields();

        //Assertions on validation messages (In the commands.ts file I created a generic method to verify validation messages instead of adding a method in every Page Object)
        cy.getValidationMessage('firstName-helper-text').should('have.text', 'First Name is required')
        cy.getValidationMessage('lastName-helper-text').should('have.text', 'Last Name is required')
        cy.getValidationMessage('username-helper-text').should('have.text', 'Username is required');
        cy.getValidationMessage('password-helper-text').should('have.text', 'Enter your password');
        cy.getValidationMessage('confirmPassword-helper-text').should('have.text', 'Confirm your password');
    

        //Verify that the signup button is disabled when no input is provided
        cy.getByData('signup-submit').should('be.disabled');
    })

    it('Verify Validation messages when invalid password values are provided', ()=>{
        SignUpPage.inputInvalidValuesonPasswordFields();
    })

    it('Verify Success Sign Up', ()=>{
        SignUpPage.validInputonAllFields();
        cy.getByData('signup-submit').should('be.enabled');
        SignUpPage.clickSignUpButton();
        
    })

    it('Verify Redirection to Sign In page', ()=>{
        SignUpPage.verifySignUpLink();
        cy.url().should("include", "/signin");
    })
})
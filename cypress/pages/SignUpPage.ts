class SignUpPage {
    private baseUrl: string = Cypress.config("baseUrl") as string;
    private loginPath: string = Cypress.env("signInPage"); // Use environment variable for path

    
    private firstName: string = 'input#firstName';
    private lastName: string = 'input#lastName';
    private userName: string = 'input#username';
    private password: string = 'input#password';
    private confirmPassword: string = 'input#confirmPassword';
    private signUpButton: string ='button[data-test="signup-submit"]';

    verifySignUpLink(){
        cy.visit(`${this.baseUrl}${this.loginPath}`);
    }

    noInputonAllFields(){
        cy.get(this.firstName).type('{selectall}{backspace}'); // this means to simulate empty input
        cy.get(this.lastName).type('{selectall}{backspace}');
        cy.get(this.userName).type('{selectall}{backspace}');
        cy.get(this.password).type('{selectall}{backspace}');
        cy.get(this.confirmPassword).type('{selectall}{backspace}');
        // After confirm password field we need to add a blur event by clicking outside the input field before asserting the message in the signup.cy.ts file.
        // The message will not be visible if we don't add the blur event.
        cy.get('body').click();
    }

    inputInvalidValuesonPasswordFields(){
        cy.get(this.password).type('1234');
        cy.get(this.confirmPassword).type('12345');
    }

    validInputonAllFields(){
        cy.get(this.firstName).type('Aimee');
        cy.get(this.lastName).type('Stuarts');
        cy.get(this.userName).type('astuarts');
        cy.get(this.password).type('123abc');
        cy.get(this.confirmPassword).type('123abc');
    }   

    clickSignUpButton(){
        cy.get(this.signUpButton).click();
    }

    signInPage(){
        cy.get('a[href="/signin"]').click();
    }
}
export default new SignUpPage();
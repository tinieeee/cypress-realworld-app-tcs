import userLogin from "../fixtures/user_login.json"

class LoginPage{

  private baseUrl: string = Cypress.config("baseUrl") as string;
  private loginPath: string = Cypress.env("signInPage"); // Use environment variable for path

   // Store selectors as private properties
   private usernameInput: string = 'input#username';
   private passwordInput: string = 'input#password';
   private signinSubmit: string = 'button[data-test="signin-submit"]';
   private rememberMeCheckbox: string = 'input.PrivateSwitchBase-input';

    VisitLoginPage() {
        return cy.visit(`${this.baseUrl}${this.loginPath}`);
    }


    loginWithFixtures(username: string, password: string, rememberMe: boolean = true){
      cy.get(this.usernameInput).type(username);
      cy.get(this.passwordInput).type(password);
      if(rememberMe){
        cy.get(this.rememberMeCheckbox).check();
      }
      return cy;
    }

    loginWithIncorrectCredentials(username: string, rememberMe: boolean = false){
      cy.get(this.usernameInput).type(username);
      cy.get(this.passwordInput).type('incorrectPassword');
      if(rememberMe){
        cy.get(this.rememberMeCheckbox).check();
      }
      return cy;
    }

    loginWithNoInputs(){
      cy.get(this.usernameInput).type('{selectall}{backspace}'); // this means to simulate empty input
      cy.get(this.passwordInput).type('{selectall}{backspace}'); //this means to simulate empty input
      return cy;
    }

    loginPasswordlessthan4chars(rememberMe: boolean = true){
      cy.get(this.passwordInput).type('123');
      if(rememberMe){
        cy.get(this.rememberMeCheckbox).check();
      }
      return cy;
    }

    SignInButton(){
      return cy.get(this.signinSubmit);
    }

}

export default new LoginPage();
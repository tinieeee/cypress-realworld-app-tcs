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
        cy.visit(`${this.baseUrl}${this.loginPath}`);
    }


    loginWithFixtures(username: string, password: string, rememberMe: boolean = true){
      cy.get(this.usernameInput).type(username);
      cy.get(this.passwordInput).type(password);
      if(rememberMe){
        cy.get(this.rememberMeCheckbox).check();
      }

    }

    loginWithIncorrectCredentials(username: string, rememberMe: boolean = false){
      // cy.fixture("user_login").then((user)=>{
      //   const randomUsername = user.username[Math.floor(Math.random() * user.username.length)];
      //   cy.get(this.usernameInput).type(randomUsername);
      //   cy.get(this.passwordInput).type('incorrectPassword');
      //   cy.get(this.signinSubmit).click();
      // })
      cy.get(this.usernameInput).type(username);
      cy.get(this.passwordInput).type('incorrectPassword');
      if(rememberMe){
        cy.get(this.rememberMeCheckbox).check();
      }
    }

    loginWithNoInputs(){
      cy.get(this.usernameInput).type('{selectall}{backspace}'); // this means to simulate empty input
      cy.get(this.passwordInput).type('{selectall}{backspace}'); //this means to simulate empty input
    }

    clickSignInButton(){
      cy.get(this.signinSubmit).click();
    }

}

export default new LoginPage();
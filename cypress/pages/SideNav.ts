class SideNav
{
     // Store selectors as private properties
   private sidenavHome: string = 'sidenav-home';
   private sidenavMyAccount: string = 'sidenav-user-settings';
   private sidenavBankAccount: string = 'sidenav-bankaccounts';
   private sidenavNotifications: string = 'sidenav-notifications';
   private sidenavLogout: string = 'sidenav-signout';


    verifyNameDisplayed(){
        return cy.getByData("sidenav-user-full-name");
    }

    verifyuserNameDisplayed(){
        return cy.getByData("sidenav-username");
    }

    verifyUserBalance(){
        return cy.getByData("sidenav-user-balance");
    }

    verifyHomeSidenavButton(){
        return cy.getByData(this.sidenavHome);
    }

    verifyMyAccountSideNavButton(){
        return cy.getByData(this.sidenavMyAccount);
    }

    verifyBankAccountSideNavButton(){
        return cy.getByData(this.sidenavBankAccount);
    }

    verifyNotificationSideNavButton(){
        return cy.getByData(this.sidenavNotifications);
        
    }

    verifyLogoutSideNavButton(){
        return cy.getByData(this.sidenavLogout);
    }

    // Continue redirection test cases
    // Common method to click the buttons
    clickSidenavButton(buttonDataAttribute: string){
        return cy.getByData(buttonDataAttribute).click();
    }

    hideSideNav(){
        return cy.getByData('sidenav-toggle').click();
    }

    verifySideNav(){
        return cy.get('.MuiDrawer-paper');
    }

}

export default new SideNav();
/// <reference types ="cypress"/>

import LoginPage from "../pages/LoginPage"
import SideNav from "../pages/SideNav"

describe("SideNav", ()=>{
    let userData: {username: string[], password: string}

    interface NavButton {
      //An interface in TypeScript is a contract or a blueprint for an object. It defines what properties and methods an object should have, along with their types
      dataAttr: string;
      expectedPath: string;
    }

    const navButtons: NavButton[] = [
      { dataAttr: 'sidenav-home', expectedPath: '/' },
      { dataAttr: 'sidenav-user-settings', expectedPath: '/user/settings' },
      { dataAttr: 'sidenav-bankaccounts', expectedPath: '/bankaccounts' },
      { dataAttr: 'sidenav-notifications', expectedPath: '/notifications' },
      { dataAttr: 'sidenav-signout', expectedPath: '/signin' },
    ];
      
    before(()=>{
        cy.fixture('user_login').then((data)=>{
            userData = data;
          });
    })

    beforeEach(()=>{
      LoginPage.VisitLoginPage();
      LoginPage.loginWithFixtures(userData.username[1], userData.password);
      LoginPage.SignInButton().click();
  })


    it('Verify Home page side nav contents', ()=>{
        SideNav.verifyNameDisplayed().should('have.text', 'Ted P');
        SideNav.verifyuserNameDisplayed().should('have.text', '@Heath93');
        SideNav.verifyUserBalance().should('have.text', '$1,509.53');
        SideNav.verifyHomeSidenavButton().should('have.text', 'Home');
        SideNav.verifyMyAccountSideNavButton().should('have.text', 'My Account');
        SideNav.verifyBankAccountSideNavButton().should('have.text', 'Bank Accounts');
        SideNav.verifyNotificationSideNavButton().should('have.text', 'Notifications');
        SideNav.verifyLogoutSideNavButton().should('have.text', 'Logout');

 
    });

  
    it('Verify Side navigation redirections are correct', () => {      
      //array of objects you created earlier above 
      //cy.wrap(navButtons) tells Cypress:"Hey, I want you to treat this JavaScript array like a Cypress command so I can use .each() and other Cypress-style chaining."
      //({ dataAttr, expectedPath }: Navbutton) is destructuring — a clean way of pulling out the dataAttr and expectedPath values from each object in the array.
      // Nav button is the interface we need to declare what type of 
      //This repeats for every nav button you define the type and in the nav button interface we define its type which is string
      //any is a catch-all type that tells TypeScript: "This variable or parameter can be of any type — I’m not specifying a particular type right now."
      cy.wrap(navButtons).each(({ dataAttr, expectedPath }: NavButton) => {
        //NavButton defines exactly what structure is expected for each item in navButtons (string declared in the interface above)
        SideNav.clickSidenavButton(dataAttr);
        cy.location('pathname').should('include', expectedPath); // or use cy.url()
      });
    });

    it('Hide the side navigation', ()=>{
      SideNav.hideSideNav();
      //should('not.be.visible') will not work reliably because in the element style="transform: translateX(-72px); visibility: hidden;
      // it is not totally hidden so not.be.visible will fail instead use the visibility hidden since the element will updat to thise if we click the hamburger to hide the sidenav
      SideNav.verifySideNav().should('have.css', 'visibility', 'hidden');
    })




});
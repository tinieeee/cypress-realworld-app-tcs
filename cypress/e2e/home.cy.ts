/// <reference types ="cypress" />
import LoginPage from "../pages/LoginPage"
import Home from "../pages/Home"



describe('Verify Home Page', ()=> {
    let userData: {username: string[], password: string}

    before(()=>{
        cy.fixture('user_login').then((data)=>{
            userData = data;
        })
    })

    beforeEach(()=>{
        LoginPage.VisitLoginPage();
        LoginPage.loginWithFixtures(userData.username[1], userData.password);
        LoginPage.SignInButton().click();

    })
    it('Verify tabs in the homepage are redirecting to the correct url',()=>{
        
        Home.verifyEveryoneTab().click().then(()=>{
            cy.url().should('eq', `${Cypress.config().baseUrl}/`)
        });
        Home.verifyFriendTab().click().then(()=>{
            cy.url().should('eq', `${Cypress.config().baseUrl}/contacts`)
        });
        Home.verifyMineTab().click().then(()=>{
            cy.url().should('eq', `${Cypress.config().baseUrl}/personal`)
        });

        Home.verifyNewTransactions().click().then(()=>{
            cy.url().should('eq', `${Cypress.config().baseUrl}/transaction/new`)
        });
        Home.verifynotifications().should('be.visible');
        Home.notificationCount().invoke('text').should('eq', '8');
    })

    it('Verify Filters for Amount range', ()=>{
        //We did it this way because on this second it block the page scrolled a bit downward not displaying the filter element into view
        //Even though your login is in beforeEach(), Cypress does not preserve the app state between it blocks, unless you use cookies/localStorage manually 
        // or set up the app to remember. (App behaves slightly different on the following it block)
        // lets explain the it line by line 
        //.should('exist') > This checks if the element is in the DOM (it exists on the page), even if it's not visible yet
        //.scrollIntoView() >  scrolls the page to bring the element into view. If it’s off-screen or below the fold, this moves it so Cypress can see it.
        //.should('be.visible') > This checks if the element is actually visible to the user — not hidden by CSS or covered by another element
        //.click({ force: true }) > "Click this even if you think it’s not fully interactable — just do it anyway." Useful when the element is visible but Cypress is being picky 
        Home.verifyFilterAmountbtn().should('exist').scrollIntoView().should('be.visible').click({ force: true });
        

        const desiredValue = 8;
        //You're setting the target value you want on the slider — in this case, 80 out of 1000.

        //You are selecting the slider element using a test attribute.
        Home.verifyFilterAmountslider().then(($slider) => {
        //Once Cypress finds the slider, it gets its position and size on the screen using getBoundingClientRect() (a built-in browser method).
          const rect = $slider[0].getBoundingClientRect();
          const sliderWidth = rect.width; //sliderWidth: how wide the slider is.
          const sliderLeft = rect.left; // sliderLeft: how far from the left side of the screen the slider starts.
          
      
          // Calculate x position based on desired value
          const percentage = desiredValue / 100; //Since sliders are often based on percentages (0 to 100), you're converting 8 into a 0.08 (8%) value 
          // you will also see in the element for the slide aria-valuemax="100"  so max value is 100
          const clickX = sliderLeft + (sliderWidth * percentage); //This calculates where to click on the slider, based on how wide it is and the percentage (0.8). So, you’ll end up clicking 8% of the way across the slider.
          


          // Click at calculated x on the slider
          cy.wrap($slider)
            .click(clickX - sliderLeft, 10, { force: true }); // y=10 is vertical offset inside slider
            // calculates the x-coordinate inside the slider (because .click() expects a position relative to the element, not the screen).
          //10: is a small vertical offset to make sure the click lands within the slider bar.
          // { force: true }: forces the click even if something might block it or Cypress thinks it's not clickable.  

        });

        //sort out how to work the second thumb of the slider currently not working as expected - this is now working but figure out how it worked
        const endDesiredValue = 70;

        Home.verifyFilterAmountslider().then(($slider) => { //You are selecting the slider element using a test attribute.
          const rect = $slider[0].getBoundingClientRect(); // Access the second thumb directly
          const sliderWidth = rect.width;
          const sliderLeft = rect.left;
        
          const percentage = endDesiredValue / 100; // 1000 is the max value
          const clickX = sliderLeft + (sliderWidth * percentage);
        
          cy.wrap($slider)
            .click(clickX - sliderLeft, 10, { force: true });
        });
        
    })
//Assignment figure out how to do the date range this is currently not working
    it.only('Verify Filters for Date Range', ()=>{
        Home.verifyDateBtn().click({ force: true });
        // Home.verifySelectDateRange().click({ force: true });
        // Home.verifySelectDateRangeFrom().click({ force: true });
        


        // it worked using this one This creates a custom Cypress command called scrollToDateRange
        // there is an issue in the UI Displayed date range in the filter is incorrect From date is selected date -1 To date displayed is correct
        cy.scrollToDateRange('.Cal__MonthList__root', '2025-02-11', '2025-02-22');

          
 
    })



})
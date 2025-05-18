class Home{

    verifyEveryoneTab(){
        return cy.getByData('nav-public-tab');
    }

    verifyFriendTab(){
        return cy.getByData('nav-contacts-tab');
    }

    verifyMineTab(){
        return cy.getByData('nav-personal-tab');
    }

    verifyNewTransactions(){
        return cy.getByData('nav-top-new-transaction');
    }

    verifynotifications(){
        return cy.get('[data-testid="NotificationsIcon"]');
    }

    notificationCount(){
        return cy.get('.MuiBadge-badge.NavBar-customBadge');
    }

    verifyFilterDate(){
        return cy.getByData('transaction-list-filter-date-range-button');
    }

    verifyFilterAmountbtn(){
        return cy.getByData('transaction-list-filter-amount-range-button');
    }

    verifyFilterAmountslider(){
        return cy.getByData('transaction-list-filter-amount-range-slider');
    }

    verifyDateBtn(){
        return cy.getByData('transaction-list-filter-date-range-button');
    }

}

export default new  Home;
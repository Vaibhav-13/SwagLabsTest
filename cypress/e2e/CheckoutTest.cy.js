describe("Shopping Cart Tests", () => {
    beforeEach(() => {
      cy.fixture("loginData").then((data) => {
        cy.login(data.validUser.username, data.validUser.password);
        cy.get("[data-test='add-to-cart-sauce-labs-backpack']").click();
        cy.get(".shopping_cart_link").click();
      });
    });
  
    // Positive Scenarios
    it("TC_29 - Verify cart item details", () => {
      cy.get(".cart_item").should("have.length", 1);
      cy.get(".inventory_item_name").should("contain", "Sauce Labs Backpack");
      cy.get(".inventory_item_price").should("contain", "$29.99");
      cy.get(".cart_quantity").should("have.text", "1");
    });
  
    it("TC_30 - Remove an item from the cart", () => {
      cy.get("[data-test='remove-sauce-labs-backpack']").click();
      cy.get(".cart_item").should("not.exist");
    });
  
    it("TC_31 - Continue shopping from cart", () => {
      cy.get("[data-test='continue-shopping']").click();
      cy.url().should("include", "inventory.html");
    });
  
    it("TC_32 - Proceed to checkout", () => {
      cy.get("[data-test='checkout']").click();
      cy.url().should("include", "checkout-step-one.html");
    });
  
    // Negative Scenarios
    it("TC_33 - Verify cart when empty", () => {
      cy.get("[data-test='remove-sauce-labs-backpack']").click();
      cy.get(".cart_item").should("not.exist");
      cy.get(".cart_list").should("contain", "Your cart is empty");
    });
  
    it("TC_34 - Try to checkout with an empty cart", () => {
      cy.get("[data-test='remove-sauce-labs-backpack']").click();
      cy.get("[data-test='checkout']").click();
      cy.get(".cart_list").should("contain", "Your cart is empty");
    });
  
    // Edge Case Scenarios
    it("TC_35 - Verify large quantity handling", () => {
      for (let i = 0; i < 100; i++) {
        cy.get("[data-test='add-to-cart-sauce-labs-backpack']").click();
      }
      cy.get(".shopping_cart_badge").should("have.text", "100");
    });
  
    it("TC_36 - Verify cart retention after logout", () => {
      cy.get("[data-test='logout-sidebar']").click();
      cy.fixture("testData").then((data) => {
        cy.login(data.validUser.username, data.validUser.password);
      });
      cy.get(".shopping_cart_link").click();
      cy.get(".cart_item").should("not.exist"); 
    });
  });
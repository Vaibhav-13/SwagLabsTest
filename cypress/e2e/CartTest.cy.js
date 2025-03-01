describe("HShopping Cart Tests", () => {
    beforeEach(() => {
      cy.fixture("loginData").then((data) => {
        cy.login(data.validUser.username, data.validUser.password);
      });
    });
  
    // Positive Scenarios
    it("TC_20 - Verify product listing", () => {
      cy.get(".inventory_item").should("have.length", 6);
      cy.get(".inventory_item_name").should("be.visible");
      cy.get(".inventory_item_desc").should("be.visible");
      cy.get(".inventory_item_price").should("be.visible");
    });
  
    it("TC_21 - Verify sorting functionality", () => {
      const sortingOptions = ["az", "za", "lohi", "hilo"];
      sortingOptions.forEach((option) => {
        cy.get("[data-test='product_sort_container']").select(option);
        cy.wait(500); // Allow sorting to reflect
      });
    });
  
    it("TC_22 - Add a product to the cart", () => {
      cy.get("[data-test='add-to-cart-sauce-labs-backpack']").click();
      cy.get(".shopping_cart_badge").should("have.text", "1");
    });
  
    it("TC_23 - Remove a product from the cart (Home Page)", () => {
      cy.get("[data-test='add-to-cart-sauce-labs-backpack']").click();
      cy.get("[data-test='remove-sauce-labs-backpack']").click();
      cy.get(".shopping_cart_badge").should("not.exist");
    });
  
    it("TC_24 - Navigate to the shopping cart", () => {
      cy.get(".shopping_cart_link").click();
      cy.url().should("include", "/cart.html");
    });
  
    // Negative Scenarios
    it("TC_25 - Verify broken images for products (problem_user)", () => {
      cy.fixture("testData").then((data) => {
        cy.login(data.otherValidUsers[0].username, data.otherValidUsers[0].password); // problem_user
      });
      cy.get(".inventory_item_img").each(($img) => {
        cy.wrap($img).should("be.visible"); // Broken images should not be visible
      });
    });
  
    it("TC_26 - Verify UI issues for a problematic user", () => {
      cy.fixture("testData").then((data) => {
        cy.login(data.otherValidUsers[0].username, data.otherValidUsers[0].password); // problem_user
      });
      cy.get(".inventory_item").should("have.length", 6); // UI should load properly
      cy.get("[data-test='add-to-cart-sauce-labs-backpack']").should("be.visible");
    });
  
    // Edge Cases
    it("TC_27 - Add multiple items to cart", () => {
      cy.get("[data-test^='add-to-cart']").each(($btn) => {
        cy.wrap($btn).click();
      });
      cy.get(".shopping_cart_badge").should("have.text", "6");
    });
  
    it("TC_28 - Verify cart count after refresh", () => {
      cy.get("[data-test^='add-to-cart']").first().click();
      cy.reload();
      cy.get(".shopping_cart_badge").should("have.text", "1");
    });
  });
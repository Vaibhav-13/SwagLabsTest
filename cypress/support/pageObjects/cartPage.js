class CartPage {
    addItemToCart(productName) {
      cy.contains(productName).parent().find("button").click();
    }
  
    verifyCartItem(productName) {
      cy.get(".cart_item").should("contain.text", productName);
    }
  
    removeItemFromCart(productName) {
      cy.contains(productName).parent().find('[data-test="remove"]').click();
    }
  }
  
  export default new CartPage();
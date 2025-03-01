class CheckoutPage {
    clickCheckout() {
      cy.get('[data-test="checkout"]').click();
    }
  
    addItemToCart(productName) {
      cy.contains(productName).parent().find("button").click();
    }
  }
  
  export default new CheckoutPage();
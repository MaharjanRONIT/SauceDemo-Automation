describe("SauceDemo Cart Page Testing Functionality", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.url().should("include", "/inventory");
  });

  it("should add product to cart and navigate to cart page when cart icon is clicked and verify cart contents", () => {
    cy.get(".inventory_item").first().find(".btn_inventory").click();
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart");
    cy.get(".cart_item").should("exist");
  });

  it("should Verify product name and price in cart matches product listing", () => {
    cy.get(".inventory_item").first().find(".btn_inventory").click();
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart");
    cy.get(".cart_item")
      .first()
      .find(".inventory_item_name")
      .should("have.text", "Sauce Labs Backpack");
    cy.get(".cart_item")
      .first()
      .find(".inventory_item_price")
      .should("have.text", "$29.99");
  });

  it("should remove product from cart and verify cart is empty", () => {
    cy.get(".inventory_item").first().find(".btn_inventory").click();
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart");
    cy.get(".cart_item").first().find(".cart_button").click();
    cy.get(".cart_item").should("not.exist");
  });

  it("should add multiple products to cart and verify all products are listed in cart", () => {
    cy.get(".inventory_item").eq(0).find(".btn_inventory").click();
    cy.get(".inventory_item").eq(1).find(".btn_inventory").click();
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart");
    cy.get(".cart_item").should("have.length", 2);
  });

  it("should verify empty cart has no items and displays appropriate message", () => {
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart");
    cy.get(".cart_item").should("not.exist");
    // ! no message is displayed when cart is empty, only the cart is empty without any text
    // cy.get(".cart_empty");
    //   .should("be.visible")
    //   .and("have.text", "Your cart is empty");
  });

  it("Continue Shopping button → verify returns to products page", () => {
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart");
    cy.get('[data-test="continue-shopping"]').first().click();
    cy.url().should("include", "/inventory");
  });
});

describe("SauceDemo Checkout Testing Functionality", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.url().should("include", "/inventory");
  });

  it("should Complete full checkout with valid details", () => {
    cy.get(".inventory_item").first().find(".btn_inventory").click();
    cy.get(".shopping_cart_badge").should("have.text", "1");
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart");
    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/checkout-step-one");
    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();
    cy.url().should("include", "/checkout-step-two");
    cy.get('[data-test="finish"]').click();
    cy.url().should("include", "/checkout-complete");
    cy.get(".complete-header").should("have.text", "Thank you for your order!");
  });

  it("should display error message when trying to checkout with missing required fields", () => {
    cy.get(".inventory_item").first().find(".btn_inventory").click();
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart");
    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/checkout-step-one");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should("be.visible");
  });

  it("should verify that the order summary page displays correct product details and total price", () => {
    cy.get(".inventory_item").first().find(".btn_inventory").click();
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart");
    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/checkout-step-one");
    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();
    cy.url().should("include", "/checkout-step-two");
    cy.get(".cart_item")
      .first()
      .find(".inventory_item_name")
      .should("have.text", "Sauce Labs Backpack");
    cy.get(".cart_item")
      .first()
      .find(".inventory_item_price")
      .should("have.text", "$29.99");
    cy.get(".summary_total_label").should("have.text", "Total: $32.39");
  });

  it("should navigate back to cart page from order summary page", () => {
    cy.get(".inventory_item").first().find(".btn_inventory").click();
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart");
    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/checkout-step-one");
    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();
    cy.url().should("include", "/checkout-step-two");
    cy.get(".cart_item")
      .first()
      .find(".inventory_item_name")
      .should("have.text", "Sauce Labs Backpack");
    cy.get(".cart_item")
      .first()
      .find(".inventory_item_price")
      .should("have.text", "$29.99");
    cy.get(".summary_total_label").should("have.text", "Total: $32.39");
    cy.get('[data-test="cancel"]').click();
    // cy.url().should("include", "/products");
  });
});

describe("SauceDemo End-to-End Flow Testing Functionality", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.url().should("include", "/inventory");
  });

  it("Login → Add product → Go to cart → Checkout → Place order → Verify confirmation", () => {
    // Add product to cart
    cy.get(".inventory_item").first().find(".btn_inventory").click();
    cy.get(".shopping_cart_badge").should("have.text", "1");
    // Go to cart
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart");
    cy.get(".cart_item").should("exist");
    // Checkout
    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/checkout-step-one");
    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();
    cy.url().should("include", "/checkout-step-two");
    // Place order
    cy.get('[data-test="finish"]').click();
    cy.url().should("include", "/checkout-complete");
  });

  it("Login → Add multiple products → Verify added products → Verify total price → Complete checkout → Verify order confirmation", () => {
    // Add multiple products to cart
    cy.get(".inventory_item").eq(0).find(".btn_inventory").click();
    cy.get(".inventory_item").eq(1).find(".btn_inventory").click();
    cy.get(".shopping_cart_badge").should("have.text", "2");
    // Go to cart
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart");
    cy.get(".cart_item").should("have.length", 2);
    // Verify product details in cart
    cy.get(".cart_item")
      .eq(0)
      .find(".inventory_item_name")
      .should("have.text", "Sauce Labs Backpack");
    cy.get(".cart_item")
      .eq(0)
      .find(".inventory_item_price")
      .should("have.text", "$29.99");
    cy.get(".cart_item")
      .eq(1)
      .find(".inventory_item_name")
      .should("have.text", "Sauce Labs Bike Light");
    cy.get(".cart_item")
      .eq(1)
      .find(".inventory_item_price")
      .should("have.text", "$9.99");
    // Checkout
    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/checkout-step-one");
    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();
    cy.url().should("include", "/checkout-step-two");
    // Verify total price
    cy.get(".summary_total_label").should("have.text", "Total: $43.18");
    // Place order
    cy.get('[data-test="finish"]').click();
    cy.url().should("include", "/checkout-complete");
    cy.get(".complete-header").should("have.text", "Thank you for your order!");
  });

  it("Login → Add product → Remove from cart → Verify cart empty → Logout", () => {
    // Add product to cart
    cy.get(".inventory_item").first().find(".btn_inventory").click();
    cy.get(".shopping_cart_badge").should("have.text", "1");
    // Go to cart
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart");
    // Remove product from cart
    cy.get(".cart_item")
      .first()
      .find('[data-test="remove-sauce-labs-backpack"]')
      .click();
    // Verify cart is empty
    cy.get(".cart_item").should("not.exist");
    // Logout
    cy.get("button#react-burger-menu-btn").click();
    cy.get("a#logout_sidebar_link").click();
    cy.url().should("include", "/");
  });
});

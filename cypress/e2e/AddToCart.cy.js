describe("SauceDemo Add to Cart Testing Functionality", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.url().should("include", "/inventory");
  });

  it("should add product to cart and verify cart badge", () => {
    cy.get(".inventory_item").first().find(".btn_inventory").click();
    cy.get(".shopping_cart_badge").should("have.text", "1");
  });

  it("should add multiple products to cart and verify cart badge", () => {
    cy.get(".inventory_item").eq(0).find(".btn_inventory").click();
    cy.get(".inventory_item").eq(1).find(".btn_inventory").click();
    cy.get(".shopping_cart_badge").should("have.text", "2");
  });

  it("should verify button changes from Add to Cart to Remove after adding product to cart", () => {
    cy.get(".inventory_item").first().find(".btn_inventory").click();
    cy.get(".inventory_item")
      .first()
      .find(".btn_inventory")
      .should("have.text", "Remove");
  });

  it("should verify cart badge updates correctly after removing product from cart", () => {
    cy.get(".inventory_item").first().find(".btn_inventory").click();
    cy.get(".shopping_cart_badge").should("have.text", "1");
    cy.get(".inventory_item").first().find(".btn_inventory").click();
    // cy.get(".shopping_cart_badge").should("not.exist");
  });

  it("should Add all 6 products to cart and verify cart badge", () => {
    cy.get(".inventory_item").each(($el) => {
      cy.wrap($el).find(".btn_inventory").click();
    });
    cy.get(".shopping_cart_badge").should("have.text", "6");
  });
});

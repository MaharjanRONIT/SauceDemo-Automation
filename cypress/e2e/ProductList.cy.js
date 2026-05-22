describe("SauceDemo Product List Testing Functionality", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.url().should("include", "/inventory");
  });

  it("should display the correct number of products", () => {
    cy.get(".inventory_item").should("have.length", 6);
  });

  it("Verify each product has name, price, image and button", () => {
    cy.get(".inventory_item").each(($el) => {
      cy.wrap($el)
        .find(".inventory_item_name")
        .should("be.visible")
        .and("not.be.empty");
      cy.wrap($el)
        .find(".inventory_item_price")
        .should("be.visible")
        .and("contain", "$");
      cy.wrap($el).find(".inventory_item_img").should("be.visible");
      cy.wrap($el)
        .find(".btn_inventory")
        .should("be.visible")
        .and("have.text", "Add to cart");
    });
  });

  it("Should sort products by all options", () => {
    // Name A to Z
    cy.get(".product_sort_container").select("az");
    cy.get(".product_sort_container").should("have.value", "az");

    // Name Z to A
    cy.get(".product_sort_container").select("za");
    cy.get(".product_sort_container").should("have.value", "za");

    // Price Low to High
    cy.get(".product_sort_container").select("lohi");
    cy.get(".product_sort_container").should("have.value", "lohi");

    // Price High to Low
    cy.get(".product_sort_container").select("hilo");
    cy.get(".product_sort_container").should("have.value", "hilo");
  });

  it("should add products to cart and verify cart badge", () => {
    cy.get(".inventory_item").first().find(".btn_inventory").click();
    cy.get(".shopping_cart_badge").should("have.text", "1");
  });
});

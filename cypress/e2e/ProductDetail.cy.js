describe("SauceDemo Product Detail Testing Functionality", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.url().should("include", "/inventory");
  });

  it("should navigate to product detail page when a product's name is clicked", () => {
    cy.get(".inventory_item").first().find(".inventory_item_name").click();
    cy.url().should("include", "/inventory-item.html");
  });

  it("should verify that the product detail page displays the correct product information", () => {
    cy.get(".inventory_item").first().find(".inventory_item_name").click();
    cy.get("div[data-test='inventory-item-name']").should(
      "have.text",
      "Sauce Labs Backpack",
    );
    cy.get("div[data-test='inventory-item-price']").should(
      "have.text",
      "$29.99",
    );
  });
  //   it("should display correct product details on the product detail page", () => {
  //     cy.get(".inventory_item").first().find(".inventory_item_name").click();
  //     cy.get("div[data-test='inventory-item-price']").should("be.visible");
  //     cy.get(".inventory_item_price").should("be.visible");
  //     cy.get(".inventory_item_img").should("be.visible");
  //   });

  //   it("should click product image to verify correct product detail page is displayed", () => {
  //     cy.get(".inventory_item").first().find(".inventory_item_img").click();
  //     cy.url().should("include", "/inventory-item.html");
  //     cy.get(".inventory_item_name").should("be.visible");
  //   });

  it("should add product to cart from product detail page and verify cart badge", () => {
    cy.get(".inventory_item").first().find(".inventory_item_name").click();
    cy.get(".btn_inventory").click();
    cy.get(".shopping_cart_badge").should("have.text", "1");
  });

  it("should remove product from cart on product detail page and verify cart badge", () => {
    cy.get(".inventory_item").first().find(".inventory_item_name").click();
    cy.get(".btn_inventory").click();
    cy.get(".shopping_cart_badge").should("have.text", "1");
    cy.get(".btn_inventory").click();
    // cy.get(".shopping_cart_badge").should("have.text", "0");
  });

  it("should navigate back to product list page from product detail page", () => {
    cy.get(".inventory_item").first().find(".inventory_item_name").click();
    cy.get(".inventory_details_back_button").click();
    cy.url().should("include", "/inventory");
  });
});

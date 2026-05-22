describe("SauceDemo Login Testing Functionality", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });

  it("should login with Valid credentials", () => {
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
  });

  it("should not login with Invalid credentials", () => {
    cy.get("#user-name").type("invalid_user");
    cy.get("#password").type("invalid_password");
    cy.get("#login-button").click();
    cy.get("[data-test='error']").should(
      "have.text",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("should not login with empty credentials", () => {
    cy.get("#login-button").click();
    cy.get("[data-test='error']").should(
      "have.text",
      "Epic sadface: Username is required"
    );
  });

  it("should not log in with locked out user", () => {
    cy.get("#user-name").type("locked_out_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get("[data-test='error']").should(
      "have.text",
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  it("should verify error message text", () => {
    cy.get("#user-name").type("invalid_user");
    cy.get("#password").type("invalid_password");
    cy.get("#login-button").click();
    cy.get("[data-test='error']").should(
      "have.text",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("should verify redirect to product page after login", () => {
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.url().should("include", "/inventory.html");
  }); 
  
});

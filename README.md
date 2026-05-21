# SauceDemo Cypress Test Suite

This project contains end-to-end tests for the SauceDemo web application using Cypress.

## Project Structure

```
cypress.config.js
package.json
cypress/
  e2e/
    AddToCart.cy.js
    CartPage.cy.js
    CheckoutTests.cy.js
    E2EFlow.cy.js
    LogInFUnctionality.cy.js
    ProductList.cy.js
    ProductDetail.cy.js
  fixtures/
    example.json
  support/
    commands.js
    e2e.js
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone this repository or download the source code.
2. Navigate to the project directory:
   ```sh
   cd Saucedemo
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Running Tests

To open the Cypress Test Runner:

```sh
npx cypress open
```

To run tests in headless mode:

```sh
npx cypress run
```

## Test Files

- **LogInFUnctionality.cy.js**: Tests for login functionality.
- **ProductList.cy.js**: Tests for product list features (display, sorting, etc.).
- **ProductDetail.cy.js**: Tests for product detail page features.
- **AddToCart.cy.js**: Tests for add to cart features.
- **CartPage.cy.js**: Tests for cart feature.
- **CheckoutTests.cy.js**: Tests for Checkout flow.
- **E2EFlow.cy.js**: Tests End To End flow of the system.

## Custom Commands & Fixtures

- Custom Cypress commands can be found in `cypress/support/commands.js`.
- Test data and fixtures are in `cypress/fixtures/`.

## Notes

- The tests use the standard SauceDemo credentials:
  - Username: `standard_user`
  - Password: `secret_sauce`
- Make sure you have a stable internet connection to access https://www.saucedemo.com/ during test execution.

## License

This project is for educational and testing purposes only.

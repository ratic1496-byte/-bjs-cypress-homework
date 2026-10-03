Cypress.Commands.add("login", (email, password) => {
  cy.contains("Log in").click();
  if (email) {
    cy.get("#mail").type(email);
  }
  if (password) {
    cy.get("#pass").type(password);
  }
  cy.contains("Submit").click();
});

Cypress.Commands.add("addBook", (title, description, author, isFavorite = false) => {
  cy.contains("Add new").click();
  cy.get("#title").type(title);
  cy.get("#description").type(description);
  cy.get("#authors").type(author);
  if (isFavorite) {
    cy.get("#favorite").check();
  }
  cy.contains("Submit").click();
});

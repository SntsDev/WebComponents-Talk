describe("demo-app", () => {
  it("HOME should display welcome message", () => {
    cy.visit("/");
    cy.get("h1").contains("Welcome to Web Components Demo App");
  });
});

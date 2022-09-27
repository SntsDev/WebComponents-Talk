describe("Form page should", () => {
  it("Have the form with the fields", () => {
    cy.visit("/form");

    cy.get("h1").contains("Form");

    cy.get("#form-row-title").find("sl-input").shadow().find("label").contains("Title");
    cy.get("#form-row-space")
      .find("input-units-element")
      .shadow()
      .find("sl-input")
      .shadow()
      .find("label")
      .contains("Space");

    // We'd love to have something like this (but doesn't work):
    // cy.findByLabelText(/Title:/i).should("exist");
  });
});

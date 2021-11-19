describe("App search", () => {
  beforeEach(() => {
    cy.seedAndVisit([]);
  });

  it("Displays search", () => {
    cy.get(".searchInput").type("journey");

    cy.get(".searchButton").click();
    cy.get(".card-box").should("have.length", 6);

    cy.get(".item-box")
      .children()
      .each(($el) => {
        if (
          $el.text() ===
          "Journey 3: From the Earth to the MoonRelease date: 2018-12-31"
        ) {
          cy.wrap($el).click();
        }
      });
    cy.get("a").contains("Journey 3: From the Earth to the Moon");
  });
});

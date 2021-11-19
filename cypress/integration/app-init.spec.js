describe("App initialization", () => {
  it("Loads movies on page", () => {
    cy.seedAndVisit();

    cy.get(".movie-list").should("have.length", 1);
  });

  it("Displays an error on failure", () => {
    cy.server();
    cy.route({
      url: "/search",
      method: "GET",
      status: 200,
      response: {},
    });
    cy.visit("/");
    cy.get(".todo-list li").should("not.exist");
  });

  it("Displays movies", () => {
    cy.get(".card-box").should("have.length", 10);
  });
});

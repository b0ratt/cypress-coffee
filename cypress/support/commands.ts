function generateDataCySelector(value: string) {
	return `[data-cy="${value}"]`;
}

Cypress.Commands.add('dataCy', (value, options) => {
	return cy.get(generateDataCySelector(value), options);
});

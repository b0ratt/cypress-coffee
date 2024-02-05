import { WaitOptions } from 'cypress/types/net-stubbing';
import Chainable = Cypress.Chainable;
import TypeOptions = Cypress.TypeOptions;

export class SearchBar {
	registerSearchRequest(alias: string = 'searchRequest'): this {
		const route = /\/search/;
		cy.intercept({
			method: 'GET',
			pathname: route,
		}).as(alias);
		return this;
	}

	waitForSearchResponse(alias: string = 'searchRequest', options?: Partial<WaitOptions>): this {
		cy.wait(`@${alias}`, options).then((request) => {
			expect(request.response.statusCode).to.eq(200);
		});
		return this;
	}

	clickSearchBtn(): this {
		this.getSearchBtn().should('be.visible').click();

		return this;
	}

	typeIntoSearch(phrase: string, typeOptions?: Partial<TypeOptions>): this {
		this.getSearchBarInput().type(phrase, typeOptions);

		return this;
	}

	assertSearchSkeletonNotExist(): this {
		this.getProductSkeleton().should('not.exist');

		return this;
	}

	private getSearchBarInput(): Chainable {
		return cy.dataCy('search_input');
	}

	private getSearchBtn(): Chainable {
		return cy.dataCy('search_btn');
	}

	private getProductSkeleton(): Chainable {
		return cy.dataCy('products_skeleton');
	}
}

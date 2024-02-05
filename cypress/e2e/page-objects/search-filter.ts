import { WaitOptions } from 'cypress/types/net-stubbing';
import Chainable = Cypress.Chainable;

export class SearchFilter {
	registerFilterRequest(filterName: string, alias: string = 'filtered'): this {
		const route = '**/search';
		cy.intercept({
			method: 'GET',
			pathname: route,
			query: {
				filter: filterName,
			},
		}).as(alias);
		return this;
	}

	waitForFilterResponse(alias: string = 'filtered', options?: Partial<WaitOptions>): this {
		cy.wait(`@${alias}`, options).then((request) => {
			expect(request.response.statusCode).to.eq(200);
		});
		return this;
	}

	selectFilterOption(filterName: string, value: string): this {
		this.getFilterBtn(filterName).click();
		this.getFilterDropdown().within(() => {
			this.getFilterDropdownItem().contains(value).click();
		});

		return this;
	}

	assertProductsCategoryVisible(category: string = null): this {
		category === null
			? this.getProductCategory().should('be.visible')
			: this.getProductCategory().contains(category).should('be.visible');

		return this;
	}

	private getProductCategory(): Chainable {
		return cy.dataCy('category');
	}

	private getFilterBtn(filterName: string = ''): Chainable {
		return cy.dataCy(`filter_btn:contains(${filterName})`);
	}

	private getFilterDropdown(): Chainable {
		return cy.dataCy('filter_dropdown');
	}

	private getFilterDropdownItem(): Chainable {
		return cy.dataCy('filter_item');
	}
}

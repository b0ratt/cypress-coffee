import Chainable = Cypress.Chainable;

export interface Category {
	categoryName: string;
	value: string;
}

export class ProductsCatalog {
	assertProductsVisible(): this {
		this.getProductItem().should('be.visible');

		return this;
	}

	assertProductCategories(categories: Category[]): this {
		categories.forEach((category) => {
			const { categoryName, value } = category;

			this.getProductItem().within(() => {
				this.getProductCategory()
					.contains(categoryName)
					.siblings('.category_labe')
					.contains(`: ${value}`);
			});
		});

		return this;
	}

	private getProductItem(): Chainable {
		return cy.dataCy('product_item');
	}

	private getProductCategory(): Chainable {
		return cy.dataCy('product_category');
	}
}

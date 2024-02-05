import { SearchFilter } from '../page-objects/search-filter';
import { Category, ProductsCatalog } from '../page-objects/products-catalog';
import { SearchBar } from '../page-objects/search-bar';

describe('SEARCH', () => {
	const searchBar = new SearchBar();
	const productsCatalog = new ProductsCatalog();
	const searchFilter = new SearchFilter();
	let productCategories: Category[];

	beforeEach('Login and navigate to search page', () => {
		cy.setCookie('session-username', Cypress.env('LOGIN'));
		cy.visit('/browse.html');
		searchBar.registerSearchRequest();
	});

	it('[SEARCH-1] Should search and filter products', () => {
		productCategories = [
			{
				categoryName: 'Product Type',
				value: 'Electronics',
			},
			{
				categoryName: 'Price',
				value: '500-1000',
			},
		];

		searchBar.clickSearchBtn().waitForSearchResponse().assertSearchSkeletonNotExist();

		productCategories.forEach((item) => {
			const { categoryName, value } = item;

			searchFilter
				.assertProductsCategoryVisible()
				.registerFilterRequest(value, categoryName)
				.selectFilterOption(categoryName, value)
				.waitForFilterResponse(categoryName);

			productsCatalog.assertProductCategories([{ categoryName: categoryName, value: value }]);
		});
	});
});

declare namespace Cypress {
	interface Chainable {
		dataCy<E extends Node = HTMLElement>(
			value: string,
			options?: Partial<Loggable & Timeoutable & Withinable>
		): Chainable<JQuery<E>>;
	}
}

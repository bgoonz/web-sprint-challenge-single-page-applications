describe("Open Page", () => {
    it('Loads the page and navigates to the Pizza Form', () => {
        cy.visit('localhost:3000')
        cy.contains('Order').click()
    })
})

describe("Fiil out form", () => {
    it('Fills out form, and verifies that checkboxes can be toggled', () => {
        cy.get('input[name=name]').type('Mr Jones').should('have.value', 'Mr Jones');
        cy.get('#size-dropdown').select('large').contains('Large');
        cy.get('input[name=pepperoni]').click().should('have.checked', true);
        cy.get('input[name=sausage]').click().should('have.checked', true);
        cy.get('input[name=canadian-bacon]').click().should('have.checked', true);
        cy.get('input[name=pineapple]').click().should('have.checked', true);
        cy.get('input[name=special-text]').type('special text test').should('have.value', 'special text test');
    })
})

describe("Submit Form", () => {
    it('Submits form to API endpoint and verify success', () => {
        cy.server()
        cy.route('POST', "https://reqres.in/api/orders").as('order');

        cy.get('button').click();
        cy.wait('@order');

        cy.get('@order').then(xhr => {
            expect(xhr.status).to.be.gt(199).lt(300)
        })
    })
})